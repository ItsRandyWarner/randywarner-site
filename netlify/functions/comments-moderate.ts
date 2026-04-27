import type { Config, Context } from "@netlify/functions";
import {
	compareModerationDates,
	deleteAllCommentsForPost,
	deleteCommentThread,
	getComment,
	listCommentsByStatus,
	listCommentsForPost,
	listPendingComments,
	nowIso,
	publicComment,
	saveComment,
	sanitizeCommentBody,
	sanitizeDisplayName,
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

function authorized(req: Request) {
	const expectedSecret = Netlify.env.get("COMMENT_MODERATION_SECRET");
	if (!expectedSecret) return false;

	const providedSecret =
		req.headers.get("x-moderation-secret") ?? req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

	return Boolean(providedSecret && providedSecret === expectedSecret);
}

async function withParentPreview(comment: CommentRecord) {
	if (!comment.parentCommentId) {
		return {
			commentId: comment.commentId,
			parentCommentId: null,
			parentPreview: null,
			postSlug: comment.postSlug,
			displayName: comment.displayName,
			body: comment.body,
			submittedAt: comment.submittedAt,
			approvedAt: comment.approvedAt,
			rejectedAt: comment.rejectedAt,
			authorRole: comment.authorRole,
			eligibilityStatus: comment.eligibilityStatus,
		};
	}

	const parentComment = await getComment(comment.postSlug, comment.parentCommentId);

	return {
		commentId: comment.commentId,
		parentCommentId: comment.parentCommentId,
		parentPreview: parentComment
			? {
					displayName: parentComment.displayName,
					body: parentComment.body,
				}
			: null,
		postSlug: comment.postSlug,
		displayName: comment.displayName,
		body: comment.body,
		submittedAt: comment.submittedAt,
		approvedAt: comment.approvedAt,
		rejectedAt: comment.rejectedAt,
		authorRole: comment.authorRole,
		eligibilityStatus: comment.eligibilityStatus,
	};
}

export default async (req: Request, _context: Context) => {
	if (!authorized(req)) {
		return json({ error: "Unauthorized." }, { status: 401 });
	}

	if (req.method === "GET") {
		const pendingComments = await Promise.all((await listPendingComments()).map(withParentPreview));
		const approvedComments = await Promise.all(
			(await listCommentsByStatus("approved"))
				.sort(compareModerationDates("approved"))
				.slice(-50)
				.reverse()
				.map(withParentPreview),
		);

		const rejectedComments = await Promise.all(
			(await listCommentsByStatus("rejected"))
				.sort(compareModerationDates("rejected"))
				.slice(-20)
				.reverse()
				.map(withParentPreview),
		);

		return json({ pendingComments, approvedComments, rejectedComments });
	}

	if (req.method === "POST") {
		const payload = await req.json().catch(() => null);
		if (!payload || typeof payload !== "object") {
			return json({ error: "Invalid request body." }, { status: 400 });
		}

		const action = String(payload.action ?? "");

		if (action === "approve" || action === "reject" || action === "restore") {
			const commentId = String(payload.commentId ?? "");
			const postSlug = String(payload.postSlug ?? "");

			if (!commentId || !postSlug) {
				return json({ error: "Missing comment id or post slug." }, { status: 400 });
			}

			const comment = await getComment(postSlug, commentId);
			if (!comment) {
				return json({ error: "Comment not found." }, { status: 404 });
			}

			const updated: CommentRecord = {
				...comment,
				status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "pending",
				approvedAt: action === "approve" ? nowIso() : null,
				rejectedAt: action === "reject" ? nowIso() : null,
				eligibilityStatus:
					action === "approve"
						? "not_reviewed"
						: action === "reject"
							? "not_applicable"
							: "not_reviewed",
			};

			await saveComment(updated);
			return json({ ok: true, comment: publicComment(updated) });
		}

		if (action === "delete") {
			const commentId = String(payload.commentId ?? "");
			const postSlug = String(payload.postSlug ?? "");

			if (!commentId || !postSlug) {
				return json({ error: "Missing comment id or post slug." }, { status: 400 });
			}

			const comment = await getComment(postSlug, commentId);
			if (!comment) {
				return json({ error: "Comment not found." }, { status: 404 });
			}

			const deletedCount = await deleteCommentThread(postSlug, commentId);
			return json({ ok: true, deletedCount });
		}

		if (action === "clear_post") {
			const postSlug = String(payload.postSlug ?? "").trim();

			if (!postSlug) {
				return json({ error: "Missing post slug." }, { status: 400 });
			}

			const existingComments = await listCommentsForPost(postSlug);
			if (!existingComments.length) {
				return json({ error: "No comments found for that post." }, { status: 404 });
			}

			const deletedCount = await deleteAllCommentsForPost(postSlug);
			return json({ ok: true, deletedCount, postSlug });
		}

		if (action === "reply") {
			const postSlug = String(payload.postSlug ?? "").trim();
			const body = sanitizeCommentBody(String(payload.body ?? ""));
			const displayName = sanitizeDisplayName(String(payload.displayName ?? "Randy Warner"));
			const parentCommentId = payload.parentCommentId ? String(payload.parentCommentId).trim() : null;

			if (!postSlug || body.length < 3) {
				return json({ error: "Missing post slug or reply body." }, { status: 400 });
			}

			if (!isPublishedWritingSlug(postSlug)) {
				return json({ error: "Comments are not available for that post." }, { status: 404 });
			}

			if (parentCommentId) {
				const parentComment = await getComment(postSlug, parentCommentId);
				if (!parentComment) {
					return json({ error: "Reply target could not be found." }, { status: 400 });
				}
			}

			const reply: CommentRecord = {
				commentId: crypto.randomUUID(),
				participantId: "owner",
				parentCommentId,
				displayName,
				email: "",
				postSlug,
				body,
				submittedAt: nowIso(),
				approvedAt: nowIso(),
				rejectedAt: null,
				status: "approved",
				authorRole: "owner",
				eligibilityStatus: "not_applicable",
				sourceIp: null,
				userAgent: null,
			};

			await saveComment(reply);
			return json({ ok: true, comment: publicComment(reply) }, { status: 201 });
		}

		return json({ error: "Unknown action." }, { status: 400 });
	}

	return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
	path: "/api/comments/moderate",
	method: ["GET", "POST"],
};
