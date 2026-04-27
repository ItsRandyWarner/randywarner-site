import { getStore } from "@netlify/blobs";

export type CommentStatus = "pending" | "approved" | "rejected";
export type CommentAuthorRole = "reader" | "owner";
export type EligibilityStatus = "not_reviewed" | "eligible" | "not_eligible" | "not_applicable";

export type CommentRecord = {
	commentId: string;
	participantId: string;
	parentCommentId: string | null;
	displayName: string;
	email: string;
	postSlug: string;
	body: string;
	submittedAt: string;
	approvedAt: string | null;
	rejectedAt: string | null;
	status: CommentStatus;
	authorRole: CommentAuthorRole;
	eligibilityStatus: EligibilityStatus;
	sourceIp: string | null;
	userAgent: string | null;
};

export type ParticipantRecord = {
	participantId: string;
	email: string;
	displayName: string;
	cookieSessionId: string;
	verifiedAt: string | null;
	lastSeenAt: string;
	trustLevel: "new" | "regular" | "trusted";
	status: "active" | "blocked";
};

const commentsStore = getStore({ name: "rw-comments", consistency: "strong" });
const participantsStore = getStore({ name: "rw-comment-participants", consistency: "strong" });

export const COMMENTER_COOKIE = "rw_commenter";

export function normalizePostSlug(postSlug: string) {
	return postSlug.trim().replace(/^\/+|\/+$/g, "");
}

export function nowIso() {
	return new Date().toISOString();
}

export function makeCommentId() {
	return crypto.randomUUID();
}

export function commentKey(postSlug: string, commentId: string) {
	return `posts/${normalizePostSlug(postSlug)}/${commentId}.json`;
}

export function participantKey(participantId: string) {
	return `participants/${participantId}.json`;
}

export async function saveComment(comment: CommentRecord) {
	await commentsStore.setJSON(commentKey(comment.postSlug, comment.commentId), comment);
	return comment;
}

export async function deleteComment(postSlug: string, commentId: string) {
	await commentsStore.delete(commentKey(postSlug, commentId));
}

export async function getComment(postSlug: string, commentId: string) {
	return commentsStore.get(commentKey(postSlug, commentId), { type: "json" }) as Promise<CommentRecord | null>;
}

export async function listCommentsForPost(postSlug: string) {
	const normalizedSlug = normalizePostSlug(postSlug);
	const { blobs } = await commentsStore.list({ prefix: `posts/${normalizedSlug}/` });
	const comments = await Promise.all(
		blobs.map((blob) => commentsStore.get(blob.key, { type: "json" }) as Promise<CommentRecord | null>),
	);

	return comments.filter(Boolean) as CommentRecord[];
}

export async function deleteCommentThread(postSlug: string, commentId: string) {
	const comments = await listCommentsForPost(postSlug);
	const idsToDelete = new Set<string>([commentId]);
	let changed = true;

	while (changed) {
		changed = false;
		for (const comment of comments) {
			if (comment.parentCommentId && idsToDelete.has(comment.parentCommentId) && !idsToDelete.has(comment.commentId)) {
				idsToDelete.add(comment.commentId);
				changed = true;
			}
		}
	}

	await Promise.all(Array.from(idsToDelete).map((id) => deleteComment(postSlug, id)));
	return idsToDelete.size;
}

export async function deleteAllCommentsForPost(postSlug: string) {
	const comments = await listCommentsForPost(postSlug);
	await Promise.all(comments.map((comment) => deleteComment(postSlug, comment.commentId)));
	return comments.length;
}

export async function listAllComments() {
	const { blobs } = await commentsStore.list({ prefix: "posts/" });
	const comments = await Promise.all(
		blobs.map((blob) => commentsStore.get(blob.key, { type: "json" }) as Promise<CommentRecord | null>),
	);

	return comments.filter(Boolean) as CommentRecord[];
}

export async function listPendingComments() {
	return listCommentsByStatus("pending");
}

export async function listCommentsByStatus(status: CommentStatus) {
	const comments = await listAllComments();
	return comments
		.filter((comment) => comment.status === status)
		.sort((a, b) => Date.parse(a.submittedAt) - Date.parse(b.submittedAt));
}

export function compareModerationDates(status: CommentStatus) {
	return (a: CommentRecord, b: CommentRecord) => {
		const aDateValue =
			status === "approved" ? (a.approvedAt ?? a.submittedAt) : status === "rejected" ? (a.rejectedAt ?? a.submittedAt) : a.submittedAt;
		const bDateValue =
			status === "approved" ? (b.approvedAt ?? b.submittedAt) : status === "rejected" ? (b.rejectedAt ?? b.submittedAt) : b.submittedAt;

		return Date.parse(aDateValue) - Date.parse(bDateValue);
	};
}

export async function saveParticipant(participant: ParticipantRecord) {
	await participantsStore.setJSON(participantKey(participant.participantId), participant);
	return participant;
}

export async function getParticipant(participantId: string) {
	return participantsStore.get(participantKey(participantId), { type: "json" }) as Promise<ParticipantRecord | null>;
}

export async function getOrCreateParticipant({
	participantId,
	displayName,
	email,
}: {
	participantId: string;
	displayName: string;
	email: string;
}) {
	const existing = await getParticipant(participantId);
	const participant: ParticipantRecord = {
		participantId,
		email,
		displayName,
		cookieSessionId: participantId,
		verifiedAt: existing?.verifiedAt ?? null,
		lastSeenAt: nowIso(),
		trustLevel: existing?.trustLevel ?? "new",
		status: existing?.status ?? "active",
	};

	await saveParticipant(participant);
	return participant;
}

export function getCookieValue(cookieHeader: string | null, name: string) {
	if (!cookieHeader) return null;

	const cookies = cookieHeader.split(";").map((part) => part.trim());
	const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
	return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}

export function buildCookieHeader(name: string, value: string, secure = true) {
	return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`;
}

export function sanitizeDisplayName(value: string) {
	return value.trim().replace(/\s+/g, " ").slice(0, 80);
}

export function sanitizeEmail(value: string) {
	return value.trim().toLowerCase().slice(0, 200);
}

export function sanitizeCommentBody(value: string) {
	return value.trim().replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").slice(0, 4000);
}

export function validateCommentInput({
	displayName,
	email,
	body,
}: {
	displayName: string;
	email: string;
	body: string;
}) {
	if (displayName.length < 2) return "Display name is too short.";
	if (!email.includes("@")) return "Please enter a valid email address.";
	if (body.length < 3) return "Comment is too short.";
	if (body.length > 4000) return "Comment is too long.";
	return null;
}

export function compareCommentDates(a: CommentRecord, b: CommentRecord) {
	const aDate = Date.parse(a.approvedAt ?? a.submittedAt);
	const bDate = Date.parse(b.approvedAt ?? b.submittedAt);
	return aDate - bDate;
}

export function publicComment(comment: CommentRecord) {
	return {
		commentId: comment.commentId,
		parentCommentId: comment.parentCommentId,
		displayName: comment.displayName,
		body: comment.body,
		postSlug: comment.postSlug,
		authorRole: comment.authorRole,
		submittedAt: comment.submittedAt,
		approvedAt: comment.approvedAt,
	};
}
