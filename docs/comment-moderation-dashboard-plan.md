# Comment Moderation Dashboard Plan

## Purpose

The public comment experience should stay low-friction, but the moderation side should become easier to manage as comments spread across more posts.

The goal is not to build a full community platform or WordPress-style back office. The goal is a small internal moderation surface that feels more like an inbox than a database.

## Why This Needs Its Own Plan

The first moderation page is fine for early testing and low volume, but it will get harder to use once comments exist across multiple writing posts.

The main pressure points are:

- one long page becomes hard to scan
- comments from different posts blend together
- published comments are harder to review than pending ones
- cleanup tasks become awkward
- repeat commenters become hard to recognize over time

This is normal. Most comment systems start simple and then add moderation structure before they add more public complexity.

## Guiding Principles

- Keep reader friction low.
- Put complexity on the moderation side, not the public side.
- Favor fast judgment over exhaustive admin tooling.
- Organize comments by the decisions Randy actually needs to make.
- Prefer reversible actions where practical.
- Build in stages instead of trying to match a full CMS.

## What Other Sites Usually Do

Most sites do some version of the following once comment volume grows:

- status tabs such as pending, published, rejected, spam, or trash
- per-post comment views
- search and filters
- bulk actions
- commenter history
- trust levels for regulars

For this site, the right version is a lighter, more editorial adaptation of that model.

## Recommended Direction

Turn moderation into a small dashboard with clear modes instead of one long mixed queue.

Recommended top-level structure:

- `Needs review`
- `Published`
- `Rejected`
- `By post`
- `People` later, when participant history becomes more important

This keeps the system understandable without making it feel heavy.

## Recommended V1 Dashboard Shape

### 1. Needs Review

Purpose:

- handle the comments that require a decision right now

Recommended contents:

- newest pending comments first
- post slug or post title
- display name
- submitted date
- parent-comment preview for replies
- quick actions: approve, reject, reply

Why it matters:

- this is the real daily moderation inbox
- it should be the default landing view

### 2. Published

Purpose:

- see what is live
- spot mistakes
- clean up tests or obvious issues

Recommended contents:

- recent approved comments
- grouped or filterable by post
- quick actions: reply, delete, maybe later move to trash

Why it matters:

- approved comments are not “done forever”
- this gives Randy a practical way to manage what is already public

### 3. Rejected

Purpose:

- keep reversible moderation decisions easy to undo

Recommended contents:

- recently rejected comments
- restore action
- visible reason category later if needed

Why it matters:

- sometimes comments are rejected too quickly
- a reversible queue is safer than true delete

### 4. By Post

Purpose:

- manage conversation at the writing-post level instead of one comment at a time

Recommended contents:

- list of posts with comment counts
- pending count
- approved count
- rejected count
- click into a post-specific moderation view

Why it matters:

- this is likely the biggest practical moderation win
- it lets Randy see the whole conversation around one piece in context

## Recommended Per-Post View

When Randy clicks into a post, the dashboard should show:

- post title and slug
- summary counts by status
- full thread or thread-like list for that post
- filters for pending, published, rejected
- post-level actions such as clear test comments or bulk-delete selected items

This page should feel like “manage discussion on this piece,” not “scan a global data dump.”

## Filtering And Sorting

The first useful filters are small and obvious:

- by status
- by post slug
- by display name
- replies only
- newest first / oldest first

Search does not need to be fancy.

A simple internal search by:

- display name
- email
- body text
- post slug

would already make moderation much easier.

## Recommended Action Model

Keep actions short and clear.

Recommended actions:

- approve
- reject
- restore
- reply
- delete
- clear post comments

Later possible actions:

- mark as spam
- move to trash
- restore from trash
- promote commenter trust level
- require verification next time

## Soft Delete Vs Hard Delete

Current reality:

- hard delete is useful for test cleanup and obvious mistakes

Preferred longer-term direction:

- use `trash` for normal cleanup
- reserve true delete for explicit permanent removal or system cleanup

Why:

- trash is safer
- accidental removals are easier to undo
- it keeps moderation more forgiving

Recommendation:

- keep current delete tools for now
- consider evolving delete into `move to trash` once live usage increases

## Commenter History

This is likely a stage-two moderation improvement, not a day-one requirement.

Useful future view:

- display name
- private email
- total comments
- approved count
- rejected count
- last seen
- trust level

Why it matters:

- helps recognize regular good-faith commenters
- supports future trusted commenter logic
- gives context when a new comment comes in

## Trusted Commenters

Trusted commenters should be a moderation upgrade, not a public feature pitch.

Potential later behavior:

- still no accounts or passwords
- commenter identity remains tied to private backend records
- trusted participants may skip some manual review steps
- trust can be revoked at any time

Moderation dashboard implication:

- there should eventually be a way to see and change trust level from the admin side

## Suggested Build Stages

### Stage 1: Better Structure

- split the moderation page into clearer sections or tabs
- add a proper published-comments view
- add status and post filters

### Stage 2: Per-Post Management

- add a by-post index
- add post-specific comment views
- add post-level cleanup and bulk actions

### Stage 3: Search And History

- add basic search
- add commenter history view
- add moderator-friendly metadata like trust level and last seen

### Stage 4: Smarter Moderation

- add trash/spam distinction
- add trusted commenter controls
- add lightweight moderation notes

## Recommended Build Sequence

This is the more concrete implementation order for the moderation dashboard work.

### Build 1: Split The Current Moderation Page Into Modes

Status: implemented in code.

Goal:

- make the existing moderation page easier to scan without changing the backend model much

Scope:

- add clear status views or tabs for `Needs review`, `Published`, and `Rejected`
- add a simple `post slug` filter
- keep the current actions working: approve, reject, restore, reply, delete, clear post

Why first:

- lowest implementation risk
- biggest immediate readability win
- uses the backend data and actions that already exist

Definition of done:

- Randy can switch views without scrolling through one long mixed moderation page
- Randy can quickly isolate comments for one post slug

Implementation notes:

- `/comments/moderate` now uses a single inbox panel with status tabs for `Needs review`, `Published`, and `Rejected`.
- Each status tab shows its current count from the existing moderation API response.
- A post-slug filter narrows the active status view without changing the backend data model.
- The existing actions remain available: approve, reject, restore, reply, delete, and clear post comments.

### Build 2: Add A By-Post Index

Goal:

- make moderation work around writing pieces, not just individual comments

Scope:

- show each post with counts for pending, published, and rejected comments
- sort by most recently active or highest pending count
- click through to a post-specific moderation view

Why second:

- this is probably the highest-leverage improvement once comments exist on more than one or two posts
- it changes the moderation mental model from “queue of blobs” to “conversation by piece”

Definition of done:

- Randy can instantly see which writing posts need attention
- Randy can navigate to one post’s comment thread without searching manually

### Build 3: Add A Post-Specific Moderation View

Goal:

- let Randy manage an entire thread in context

Scope:

- show all comments for one post, grouped in a readable thread-like layout
- add post-specific filters for pending, published, and rejected
- keep post-level cleanup actions in context

Why third:

- `By post` becomes much more useful once it has a dedicated destination
- this is where moderation starts to feel manageable instead of merely functional

Definition of done:

- Randy can review, reply to, and clean up one post’s discussion without leaving the page

### Build 4: Add Basic Search

Goal:

- find a comment or commenter fast when the exact post is not obvious

Scope:

- search by display name
- search by email
- search by body text
- search by post slug

Why fourth:

- helpful, but not as urgent as `By post`
- much easier to justify after real usage creates actual findability pain

Definition of done:

- Randy can find a known comment or commenter in a few seconds

### Build 5: Add Commenter History

Goal:

- give Randy enough context to recognize regulars and future trusted commenters

Scope:

- display-name level history
- approved / rejected counts
- last seen
- trust level placeholder or status

Why fifth:

- valuable for future trust and giveaway work
- not necessary before the moderation structure itself feels right

Definition of done:

- Randy can tell whether a commenter is brand new, familiar, or repeatedly problematic

## Practical Priority Order

If only the first few moderation upgrades get built, the best order is:

1. `Needs review / Published / Rejected` structure
2. `By post` index
3. post-specific moderation view

That trio would solve most of the obvious moderation pain without making the system heavy.

## What To Explicitly Hold For Later

Do not rush these into the next build:

- spam bucket
- trash system
- trusted commenter controls
- commenter verification tools
- moderation notes
- bulk edit tools
- analytics-heavy admin views

These may all become useful, but they are not the first thing that will make moderation feel dramatically better.

## What Not To Build Yet

- a full role-based admin system
- public commenter profiles
- likes or karma
- notifications
- deep nested forum threading
- heavy analytics dashboards

Those would push the site into a different kind of product.

## Recommended Next Step

Do not rebuild moderation immediately.

First, let the current live system run long enough to reveal where the real pain is.

Then the best next moderation upgrade is probably:

1. a `By post` management view
2. filters for status and post slug
3. a clearer split between pending, published, and rejected

That combination would solve most of the obvious scaling pain without changing the reader experience at all.
