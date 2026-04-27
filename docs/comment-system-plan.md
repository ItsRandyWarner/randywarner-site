# Comment System Plan

## Purpose

If comments are added to randywarner.com, they should make the writing feel more alive and connected without turning the site into a heavy platform, spam magnet, or moderation burden.

The comment system should support thoughtful response more than volume. It should feel human, lightweight, and curated.

## Recommended Position

Do not implement comments site-wide all at once.

If comments are added, start with:

- writing posts only
- simple replies, but not a deep forum-style thread system
- manual approval before anything becomes public
- no public accounts, avatars, likes, or notifications
- a workflow Randy can manage without learning a full admin system
- comments enabled on all published writing posts by default
- Randy's own public replies included in the first version

This fits the site's current direction better than a fully dynamic community system.

## Why This Fits The Site

- The site already treats writing as the deepest current surface.
- Comments are most useful where there is already something substantial to respond to.
- Manual moderation protects the tone of the site.
- A smaller, slower comment model matches the site's personal feel better than a fast social feed.

## Recommended V1

### Scope

Add comments only to published writing posts at `/writing/[slug]`.

Default recommendation:

- comments are enabled on every published writing post
- especially sensitive posts can still be disabled later if needed
- Randy can reply publicly as part of the first release

Do not add comments yet to:

- the homepage
- `/now`
- `/podcasts`
- podcast request pages

### Public Reader Experience

- Readers can see approved comments below a writing post.
- Readers can submit a comment through a simple form.
- Readers can reply to an existing comment.
- The form sets expectations that comments are reviewed before appearing publicly.
- Approved comments display in a simple conversation layout that can show replies without turning into a deep thread tree.

### Submission Form Fields

Recommended fields:

- `display_name` - public
- `email` - private, used only for moderation or follow-up
- `comment` - public
- `post_slug` - hidden
- `post_title` - hidden or derived

Optional anti-spam fields:

- honeypot field
- timestamp or simple elapsed-time check

### Public Comment Shape

Each approved comment should include only:

- display name
- body
- submitted date or approved date

Do not publish private email addresses.

Note on `website`:

- this would mean letting a commenter optionally include their own public URL, which would display alongside their name
- example: a personal site, Instagram bio link, or project page
- recommendation: do not include public website links in v1, because they increase spam and are not needed for the first release

## Recommended Technical Approach

### Recommended Direction: Dynamic Moderated Comments

Design for a dynamic comment system from the start, even if the first release stays small.

Recommended foundation:

1. Collect comment submissions through a server-side endpoint.
2. Store comments privately with statuses such as `pending`, `approved`, and `rejected`.
3. Render approved comments from live storage without requiring a site deploy.
4. Keep moderation manual at first, but build on top of a real private comment store so the system can grow.

This avoids the redeploy-per-comment problem and creates the right foundation for trusted commenters, lightweight identity, and future giveaway tracking.

### Why This Is The Best Direction

- New approved comments can appear without a site deploy.
- Trusted commenters can be added later without rethinking the whole system.
- Participant identity and giveaway tracking can build on the same private backend later.
- Randy still keeps editorial control.
- The site can stay simple in public, even if the backend becomes more capable.

### Tradeoffs

- More backend complexity than a purely static workflow.
- Requires private storage and server-side logic.
- Likely needs a lightweight moderation workflow sooner rather than later.

For this site, those tradeoffs are worth it if the alternative is a comment system Randy would not actually use.

## Identity Direction

Randy does not want a traditional account or login system.

That means the long-term interaction model should be:

- lightweight identity
- occasional verification
- persistent recognition across comments and other qualifying actions
- no public profile system

### Recommended Identity Shape

For the first implemented version of comments, identity can stay simple:

- display name and email collected at submission
- moderation handled manually
- an unsigned cookie can remember a repeat commenter for low-stakes convenience
- no persistent self-service user dashboard

For later phases, if repeat identity becomes important, move toward:

- a signed long-lived session cookie for continuity
- email verification only when the site needs higher-confidence identity
- occasional re-verification rather than permanent accounts

This supports the user experience Randy wants without turning the site into an account product.

Important distinction:

- public display identity can be visible in comments so people recognize each other
- private participant identity should handle verification, moderation, and giveaway tracking behind the scenes
- basic commenting should not require full upfront verification if the backend can still moderate safely

This means the system can feel communal in public while still keeping private tracking data out of view.

Recommended verification thresholds:

- basic commenting: no upfront verification required
- repeat convenience: currently uses an unsigned cookie; move to a signed cookie before trusted commenters, giveaway eligibility, or higher-confidence identity
- giveaway eligibility: require email verification before creating an entry
- trusted commenter promotion: require email verification
- suspicious or abusive cases: require verification before allowing further qualifying participation

## Suggested Comment Data Shape

Store comments privately, not as public repo content.

Suggested internal fields later:

- `commentId`
- `participantId`
- `displayName`
- `postSlug`
- `body`
- `submittedAt`
- `approvedAt`
- `status`
- `moderationNotes`
- `eligibilityStatus`
- `sourceIp` or anti-abuse metadata if needed
- `cookieSessionId` or similar continuity token if needed

Private moderation and identity data should stay in private storage, not in the public repo.

## Rendering Plan

When implementation happens:

- load approved comments for a post by `postSlug` from live storage
- render them below the article body
- submit new comments through a server-side endpoint
- show the comment form below the approved comments
- if there are no approved comments yet, show a gentle empty state instead of a blank block

Recommended empty-state tone:

- thoughtful and inviting
- no pressure
- something closer to "Be the first to add to the conversation" than generic blog language

## Moderation Plan

Start with full manual approval.

### Basic Workflow

1. A reader submits a comment.
2. The backend stores it as `pending`.
3. Randy reviews the submission.
4. If approved, the backend marks it `approved`.
5. The comment appears publicly without a deploy.
6. If rejected, the comment stays in private storage as `rejected` so it can be restored later if needed.

If Randy replies publicly:

7. Randy's reply is added as a first-party comment entry tied to the same post or specific parent comment.

The current private moderation page presents the same backend records as a small inbox, with separate status views for Needs review, Published, and Rejected plus a simple post-slug filter.

### Approval Guidelines

Approve comments that are:

- thoughtful
- specific
- respectful
- additive to the piece

Decline or ignore comments that are:

- spammy
- hostile
- vague drive-by reactions
- link-dumping
- clearly off-topic

## Spam And Safety

Even a simple comment form should include basic protection.

Recommended minimum safeguards:

- honeypot field
- server-side rejection of unknown writing post slugs
- server-side or review-time rejection of obviously blank or very short junk comments
- optional rule to reject comments with too many links

Do not try to build clever automated moderation in v1.

## Future Upgrade Path

If comments prove valuable and volume increases, upgrade in steps rather than jumping to a full platform.

### Stage 2: Better Moderation Workflow

Possible additions:

- lightweight moderation queue or dashboard
- moderation checklist
- reusable reply tools or moderation actions
- a clear first-party reply format for Randy's own comments
- lightweight per-person tracking keyed to verified identity rather than public accounts
- trusted commenter status that allows auto-publishing or lighter review for specific people Randy trusts
- optional email verification flow that is triggered only for giveaway eligibility, trusted promotion, or suspicious cases

See also `docs/comment-moderation-dashboard-plan.md` for the preferred next moderation shape once the current single-page queue starts feeling cramped.

### Stage 3: Expanded Dynamic Comment System

This is the primary target architecture, expanded over time rather than built all at once.

Possible future stack:

- Netlify Functions for submission and retrieval endpoints
- Netlify Blobs for approved and pending comment storage
- lightweight client-side fetch for comment rendering
- simple private moderation route or script
- lightweight verified identity with long-lived session handling

This architecture should be built in smaller stages, but it is the right default direction if Randy wants a usable long-term comment system.

## Trusted Commenters

A strong future middle ground is a trusted-commenter model.

Possible direction:

- first-time or untrusted commenters go through manual review
- trusted repeat commenters can post instantly or with lighter moderation
- Randy can manually promote or demote trusted status

Why this helps:

- it preserves quality control early on
- it reduces moderation burden later
- it allows real community regulars to interact more naturally

Recommendation:

- do not start with trusted commenters on day one
- do document it as the most likely upgrade path after the first comment release

## Giveaway System Relationship

Comments are likely to become one input into a broader interaction and giveaway system, not a standalone feature forever.

See also `docs/interaction-and-giveaway-plan.md`.

Important direction:

- not every interaction should create a giveaway entry
- comments may qualify sometimes, but only under defined rules
- the site should be able to recognize repeat participants without requiring full accounts
- giveaway logic should be tracked separately from public comment display

That means the longer-term architecture should separate:

- public comment content
- participant identity
- giveaway eligibility rules
- giveaway entry records

Recommendation:

- do not build giveaway logic into the first comment release
- do document comments so they can evolve into that system later
- treat comments as phase one of a larger lightweight interaction model built on live private storage

### Future Giveaway-Aware Data Needs

If the site eventually supports comment-linked giveaway entries, it will likely need:

- stable participant identifier
- public display name
- comment identifier
- post identifier
- approval status
- timestamps
- rule evaluation result
- giveaway entry records kept separate from the visible comment itself

This is another reason to keep the first release small and clean.

## Options Considered

### Third-Party Comment Service

Examples: Disqus, Commento, Giscus

Pros:

- fast to add
- built-in moderation in many cases

Cons:

- often visually off-brand
- can push the site toward platform/account behavior
- may depend on third-party branding, scripts, or GitHub accounts
- less ownership over the tone and data

Recommendation:

- not the preferred first path for this site

### Fully Custom Dynamic System

Pros:

- most flexible
- no deploy needed for approved comments

Cons:

- highest complexity
- requires moderation tools, storage, and client-side behavior
- pushes the site away from its current static simplicity

Recommendation:

- only if the curated static version proves too limiting

## Open Questions

- Should there be a minimum comment length to discourage low-effort replies?
- Should especially personal writing pieces have comments disabled on a case-by-case basis?
- Should especially personal writing pieces have comments disabled by default?
- What tone should the empty state and submission success message carry?
- At what point should repeat commenters move from manual recognition to lightweight verified identity?
- Which comment actions, if any, should count toward future giveaway eligibility beyond the first approved qualifying interaction in a month?

## Recommended Implementation Order

1. Keep the current direction documented: comments on all published writing posts, with Randy replies included.
2. Define the private comment storage shape and submission/approval statuses.
3. Add the comment list UI to writing post pages using approved live data.
4. Add a server-side submission endpoint with clear moderation expectations.
5. Add a lightweight moderation workflow for `pending`, `approved`, and `rejected` comments.
6. Add a first-party reply format for Randy's own comments.
7. Test submission, moderation, approval, and render flow on one post without requiring deploys.
8. Plan the later lightweight identity and giveaway-tracking layers separately instead of forcing them into the first release.

## Current Status

Initial v1 foundation implemented in code and runtime-validated through preview and production testing.

What exists now:

- writing-post comment UI
- server-side submission endpoint
- server-side validation that public submissions target an existing published writing post
- live approved comment rendering without deploys
- private moderation route
- manual approve/reject flow
- rejected comments remain restorable instead of being deleted
- comment replies are supported
- first-party reply support
- published comments can be deleted from moderation
- all comments for a single post slug can be cleared from moderation without using the Blobs CLI
- a small moderation inbox with Needs review, Published, and Rejected views plus post-slug filtering
- future moderation-dashboard direction is documented separately in `docs/comment-moderation-dashboard-plan.md`

What still needs follow-up after launch:

- keep watching how the moderation flow feels in real use
- decide whether approved comments also need an edit path later
- decide whether participant-level cleanup tools are worth adding to the moderation page
