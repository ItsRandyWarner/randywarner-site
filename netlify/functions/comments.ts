import type { Config, Context } from "@netlify/functions";
import {
	COMMENTER_COOKIE,
	buildCookieHeader,
	compareCommentDates,
	getComment,
	getCookieValue,
	getOrCreateParticipant,
	listCommentsForPost,
	makeCommentId,
	nowIso,
	publicComment,
	sanitizeCommentBody,
	sanitizeDisplayName,
	sanitizeEmail,
	saveComment,
	validateCommentInput,
	type CommentRecord,
} from "./_shared/comments";
import { isPublishedWritingSlug } from "./_shared/published-writing";

function json(data: unknown, init?: ResponseInit) {
	return new Response(JSON.stringify(data), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "no-store",
		},
		...init,
	});
}

export default async (req: Request, context: Context) => {
	if (req.method === "GET") {
		const url = new URL(req.url);
			const postSlug = url.searchParams.get("postSlug")?.trim();

			if (!postSlug) {
				return json({ error: "Missing postSlug." }, { status: 400 });
			}

			if (!isPublishedWritingSlug(postSlug)) {
				return json({ error: "Comments are not available for that post." }, { status: 404 });
			}

		const approvedComments = (await listCommentsForPost(postSlug))
			.filter((comment) => comment.status === "approved")
			.sort(compareCommentDates)
			.map(publicComment);

		return json({ comments: approvedComments });
	}

	if (req.method === "POST") {
		const payload = await req.json().catch(() => null);
		if (!payload || typeof payload !== "object") {
			return json({ error: "Invalid request body." }, { status: 400 });
		}

		const rawDisplayName = String(payload.displayName ?? "");
		const rawEmail = String(payload.email ?? "");
		const rawBody = String(payload.comment ?? "");
		const postSlug = String(payload.postSlug ?? "").trim();
		const parentCommentId = payload.parentCommentId ? String(payload.parentCommentId).trim() : null;
		const honeypot = String(payload.website ?? "");

		if (honeypot) {
			return json({ ok: true, status: "pending" }, { status: 202 });
		}

		if (!postSlug) {
			return json({ error: "Missing post slug." }, { status: 400 });
		}

		if (!isPublishedWritingSlug(postSlug)) {
			return json({ error: "Comments are not available for that post." }, { status: 404 });
		}

		if (parentCommentId) {
			const parentComment = await getComment(postSlug, parentCommentId);
			if (!parentComment || parentComment.status !== "approved") {
				return json({ error: "Reply target could not be found." }, { status: 400 });
			}
		}

		const displayName = sanitizeDisplayName(rawDisplayName);
		const email = sanitizeEmail(rawEmail);
		const body = sanitizeCommentBody(rawBody);
		const validationError = validateCommentInput({ displayName, email, body });

		if (validationError) {
			return json({ error: validationError }, { status: 400 });
		}

		const cookieHeader = req.headers.get("cookie");
		const participantId = getCookieValue(cookieHeader, COMMENTER_COOKIE) ?? crypto.randomUUID();

		await getOrCreateParticipant({ participantId, displayName, email });

		const comment: CommentRecord = {
			commentId: makeCommentId(),
			participantId,
			parentCommentId,
			displayName,
			email,
			postSlug,
			body,
			submittedAt: nowIso(),
			approvedAt: null,
			rejectedAt: null,
			status: "pending",
			authorRole: "reader",
			eligibilityStatus: "not_reviewed",
			sourceIp: context.ip ?? null,
			userAgent: req.headers.get("user-agent"),
		};

		await saveComment(comment);

		return json(
			{
				ok: true,
				status: "pending",
				message: "Comment submitted for review.",
			},
			{
				status: 202,
				headers: {
					"Set-Cookie": buildCookieHeader(COMMENTER_COOKIE, participantId, req.url.startsWith("https://")),
				},
			},
		);
	}

	return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
	path: "/api/comments",
	method: ["GET", "POST"],
};
