# Interaction And Giveaway Plan

## Purpose

The long-term goal is to let people interact with randywarner.com in lightweight, meaningful ways and occasionally reward that participation through giveaways.

This should not feel like a social network, growth hack, or points program.

It should feel:

- personal
- low-pressure
- fair
- resistant to spam and farming
- simple enough for Randy to understand and manage

## Core Idea

The site should eventually recognize repeat participants without requiring traditional accounts.

That interaction system can later support:

- comments
- future forms or prompts
- giveaway eligibility
- light repeat-participant recognition

The giveaway system should sit on top of that interaction layer, not be baked directly into comments or any one page.

See also `docs/giveaway-rules-framework.md`.

Current direction:

- a participant should feel equal in the giveaway once they meaningfully interact
- the system should not reward high volume or daily grinding with stronger odds
- monthly giveaways should likely have multiple small winners rather than one large winner

## Guiding Principles

### 1. Meaningful Interaction Over Raw Volume

The system should reward real participation, not mindless repetition.

That means:

- not every action earns an entry
- repeated low-effort actions should not stack endlessly
- thoughtful participation should matter more than frequency alone
- once someone qualifies, additional activity in the same giveaway period should not meaningfully increase their odds

### 2. No Traditional Accounts

Randy does not want usernames, passwords, profiles, or a full login product.

Recommended direction:

- lightweight identity
- unsigned cookie-based continuity for the first low-stakes comment release
- signed cookie-based continuity before trusted commenters, giveaway eligibility, or higher-confidence identity
- email-based verification only when needed
- occasional re-verification
- public display name for community-facing interaction

This gives the site continuity without turning it into an account platform.

### 3. Public Interaction And Private Tracking Should Stay Separate

Visible interaction and giveaway bookkeeping are not the same thing.

The system should separate:

- what appears publicly on the site
- who the participant is privately
- which rules determine eligibility
- which giveaway entries were actually created

### 4. Start Small And Layer Up

Do not build the full interaction system in one pass.

Recommended order:

1. comments
2. lightweight repeat-identity model
3. giveaway rule engine
4. giveaway admin workflow

## System Layers

### Layer 1: Public Interaction Surfaces

These are the things visitors actually see and use.

Examples:

- writing comments
- Randy's replies
- future prompt responses
- future community participation forms

These should stay content-first and human.

### Layer 2: Participant Identity

This is the private system for recognizing a repeat person without public accounts.

Recommended shape:

- private participant record
- email collected privately
- signed cookie-based session for continuity
- verification state only when needed
- occasional re-verification
- no public profile page
- public display name shown on approved comments or other public interactions

Possible participant fields later:

- internal participant ID
- email
- current verified status
- last verified date
- preferred public display name
- moderation notes
- trust level or review state

### Layer 3: Interaction Records

Every meaningful interaction should eventually have its own internal record.

Examples:

- comment submitted
- comment approved
- comment rejected
- Randy replied
- prompt response submitted
- giveaway-qualifying action completed

These records should exist even if the public-facing content is hidden, rejected, or later removed.

### Layer 4: Eligibility Rules

This is the logic that decides whether an interaction counts toward a giveaway.

Important principle:

- the rule should evaluate the interaction
- then create a separate giveaway entry record if it qualifies

Do not treat public comments themselves as giveaway entries.

### Layer 5: Giveaway Entries

A giveaway entry should be its own explicit record.

That record should answer:

- which participant earned it
- which interaction caused it
- which giveaway campaign it belongs to
- when it was created
- why it qualified

## Recommended V1 For The Broader System

This is still planning only, not implementation.

The first real version of the broader interaction system should probably be:

- comments on writing posts
- manual approval
- Randy replies
- public display name plus private email capture
- unsigned cookie-based continuity for repeat-commenter convenience
- no participant dashboard
- no giveaway automation yet
- live private storage so approved comments do not require deploys

This lets the interaction model start without forcing the identity and giveaway layers too early.

## Lightweight Identity Recommendation

When the site is ready for repeat-participant recognition, the best next step is likely:

1. A person submits an interaction and the site remembers them with a signed cookie.
2. The site uses that continuity for normal repeat participation.
3. When higher-confidence identity is needed, the site sends a short verification link or code by email.
4. After verification, future qualifying actions can be associated with the same participant with more confidence until re-verification is needed.

Why this is a good fit:

- no password resets
- no public profiles
- less friction than full accounts or always-on verification
- enough continuity for comments and giveaways

## Giveaway Recommendation

Giveaways should reward meaningful interaction, not become the point of the site.

Good fit:

- occasional giveaways
- clearly explained rules
- limited ways to qualify
- no pressure to spam the site
- multiple small winners rather than one dominant prize when that better fits the site's tone

Bad fit:

- every click counts
- daily grind behavior
- vague or hidden qualification rules
- reward loops that make the site feel manipulative
- systems where frequent commenters accumulate much stronger odds than everyone else

## Interaction Types To Consider Later

Not all of these should count toward giveaways.

Possible future interaction types:

- approved comment on a writing post
- approved follow-up comment after a meaningful gap
- approved response to a future community prompt
- approved contribution to a future featured discussion
- specific seasonal or campaign interaction

Probably not good giveaway signals:

- page views
- repeated reloads
- multiple comments in a burst
- low-effort one-word responses
- actions that are easy to automate or farm

## Rule Design Principles

When giveaway rules are added later, they should be:

- understandable
- rate-limited
- reviewable
- adjustable without rewriting the whole system

Examples of good rule patterns:

- first approved qualifying interaction in a month counts
- only one giveaway entry per participant per monthly campaign
- approved comments can qualify, but extra comments in the same month do not add more entries
- Randy can mark a specific interaction as manually eligible or not eligible

Examples of risky rule patterns:

- every approved comment earns an entry forever
- every interaction counts equally
- rules that depend too much on perfect automation
- one interaction per day earns another entry, if the goal is for everyone to feel equal once they participate

## Abuse And Fairness Risks

This system will need to defend against:

- spam comments
- fake identities
- duplicate emails
- repeated low-effort participation
- people trying to farm entries

Recommended anti-abuse ideas for later:

- email verification for giveaway eligibility, trusted promotion, or suspicious cases
- rate limits by participant and IP
- one qualifying giveaway entry per participant per campaign
- manual override for suspicious cases
- trust levels for repeat participants

Trusted participants could later support:

- lighter moderation
- easier identity continuity
- selective auto-publishing for comments

But trust should be earned and reversible, not automatic.

## Privacy Guidance

The site should collect the minimum private data needed to run the system well.

Recommended stance:

- keep public display minimal
- keep private tracking internal
- never expose email publicly
- clearly explain when an interaction may qualify for a giveaway

If the system grows, it should also have a simple privacy note that explains:

- what gets stored
- what stays private
- how giveaway eligibility is determined at a high level

## Suggested Data Model

This is conceptual only for now.

### Participant

- `participantId`
- `email`
- `displayName`
- `cookieSessionId`
- `verifiedAt`
- `lastSeenAt`
- `trustLevel`
- `status`

### Interaction

- `interactionId`
- `participantId`
- `type`
- `sourcePath`
- `contentId`
- `submittedAt`
- `approvedAt`
- `status`
- `metadata`

### Giveaway Campaign

- `campaignId`
- `name`
- `startsAt`
- `endsAt`
- `status`
- `ruleSetVersion`
- `winnerCount`

### Giveaway Entry

- `entryId`
- `campaignId`
- `participantId`
- `interactionId`
- `createdAt`
- `reason`
- `status`

## Technical Direction

### Phase 1: Static + Manual

Best fit for the current site:

- Netlify Forms for submissions
- approved public comments stored as repo content
- manual moderation
- no persistent identity beyond submission details

### Phase 2: Lightweight Identity

Best next step when the site needs continuity across interactions:

- Netlify Functions for verification flow
- private participant storage
- signed session cookie
- basic interaction records

### Phase 3: Giveaway Tracking

Only when the rules are clear enough to implement:

- interaction record storage
- explicit eligibility evaluation
- giveaway entry creation
- admin review workflow

### Possible Future Storage

If the site reaches this stage, likely needs include:

- Netlify Functions for verification and rule evaluation
- Netlify Blobs or another simple private store for participant and interaction records
- private admin utilities or scripts

Recommendation:

- do not pick the exact storage implementation too early
- pick the rule and moderation model first

## Current Giveaway Rule Direction

This is the current preferred direction, based on Randy's goals.

- monthly giveaway cadence
- multiple small winners
- one approved qualifying interaction per participant per month creates one entry
- additional comments or interactions in the same month do not stack more odds by default
- only approved, meaningful interactions should ever qualify

This keeps the system fairer, simpler, and less gameable than a frequency-based model.

## Suggested Rollout

1. Launch comments without giveaway logic.
2. Learn what real participation looks like.
3. Define what should count as a meaningful qualifying interaction.
4. Add lightweight participant recognition.
5. Add one small giveaway campaign with simple rules.
6. Review abuse, friction, and moderation load before expanding.

## Open Questions

- What kinds of interaction should ever count toward giveaway eligibility?
- Should giveaways be site-wide, writing-specific, or campaign-specific?
- Should the first approved qualifying interaction of the month always be the default rule, or are there cases where a campaign should work differently?
- Should Randy be able to manually award or remove entries?
- What minimum review or approval threshold should exist before an interaction can qualify?
- How should the site explain giveaway qualification without making the site feel transactional?

## Recommendation

Treat this as a slow-build system.

The idea itself is strong because it creates a path toward community without forcing a full community platform.

The main risk is not technical difficulty by itself. The real risk is accidentally building a reward loop that feels gamey, spammy, or heavier than the rest of the site.

So the best path is:

- keep comments thoughtful
- keep identity lightweight
- keep giveaway logic explicit and limited
- keep public interaction separate from private bookkeeping

## Current Status

Planned only.

Use this document to guide future implementation once comments are real and there is enough site activity to justify the next layer.
