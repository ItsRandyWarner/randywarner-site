# Giveaway Rules Framework

## Purpose

This document defines the rule shape for future giveaways on randywarner.com.

The goal is to make giveaways:

- fair
- understandable
- hard to game
- easy to explain
- aligned with the site's personal and community-focused tone

This is a framework, not a final campaign config.

## Core Rule Direction

Current preferred default:

- giveaway cadence is monthly
- there are multiple small winners instead of one large winner
- one approved qualifying interaction per participant per month creates one entry
- additional same-month activity does not create extra odds by default

This keeps the system closer to "participate and you're in" than "do more to win more."

## Rule Principles

### 1. Qualification Should Be Earned, Not Farmed

An interaction should qualify because it is meaningful enough to count, not because it happened many times.

### 2. Approval Comes Before Eligibility

If an interaction needs moderation, it should not qualify until it is approved.

This especially matters for comments.

### 3. One Person Should Not Gain Much Better Odds Through Volume

The system should avoid rewarding people for posting more often than everyone else.

Default rule:

- one entry per participant per monthly giveaway campaign

### 4. Rules Should Be Explainable In One Short Paragraph

If the rules are too complicated to explain simply, they are probably too complicated to use.

### 5. Manual Override Must Always Exist

Randy should always be able to:

- award an entry
- remove an entry
- mark an interaction as non-qualifying
- exclude suspicious participation

## Default Monthly Giveaway Model

Recommended base model:

1. A monthly giveaway campaign is active.
2. A participant completes a qualifying interaction.
3. If that interaction is approved and the participant does not already have an entry for that month, one entry is created.
4. Additional same-month interactions do not create more entries unless a specific future campaign overrides the default.
5. A few winners are selected from the pool.

## What Should Count By Default

These are good default candidates for qualifying interactions.

- an approved thoughtful comment on a writing post
- an approved response to a future community prompt
- an approved contribution to a specific featured discussion or campaign

The common thread:

- the interaction is real
- the interaction is reviewable
- the interaction is not trivial to automate

## What Should Not Count By Default

These should not qualify unless there is a very specific future reason.

- page views
- visits
- reloads
- clicks
- likes or reactions
- multiple comments in rapid succession
- duplicate comments
- one-word or very low-effort responses
- unapproved or rejected comments
- spammy or suspicious submissions

## Qualifying Comment Standard

For comment-driven qualification, a comment should usually be:

- approved
- on-topic
- non-spammy
- more than a throwaway reaction

A useful working standard:

- if Randy would be comfortable keeping the comment publicly visible, it can be considered for giveaway eligibility

That does not mean every approved comment must count forever, but approval should be the baseline threshold.

## Entry Cap Rules

Recommended default caps:

- one entry per participant per monthly campaign
- one participant record per real person
- one approved qualifying interaction is enough; more do not stack odds

Optional later caps if needed:

- one qualifying comment per post
- one qualifying interaction type per campaign
- cooldown windows between qualifying actions

## Participant Rules

Participants should be tracked privately behind the scenes.

Publicly, they can appear under a display name.

Privately, the system should use:

- participant ID
- email
- cookie/session continuity when available
- verification state when implemented
- moderation/trust notes if needed

Default fairness stance:

- a person should not gain extra odds by using multiple emails or multiple display names

## Approval Threshold

Default threshold:

- an interaction only becomes giveaway-eligible after approval if moderation applies
- giveaway entry creation should require verification once that layer is implemented, even if basic commenting does not

For the first comment-based system, that means:

- submitted comment: not eligible yet
- approved comment: eligible if the participant does not already have a monthly entry
- rejected or ignored comment: not eligible

Later expected flow:

- approved comment + no verification yet: publishable, but pending giveaway eligibility
- approved comment + verified participant + no monthly entry yet: eligible for one entry

## Manual Override Rules

Randy should be able to manually:

- award an entry to a participant
- remove an entry from a participant
- mark a specific interaction as qualifying
- mark a specific interaction as not qualifying
- disqualify a participant from a campaign if needed

Manual override is important because no rule system will catch every edge case cleanly.

## Suspicious Activity Rules

The system should treat these as warning signs:

- many comments from the same person in a short time
- repeated low-effort comments across posts
- multiple emails that appear tied to one person
- copy-pasted or nearly identical submissions
- behavior that seems aimed at farming entries rather than participating

Recommended response options:

- deny giveaway qualification for the interaction
- require verification
- manually review the participant
- disqualify from the current campaign if clearly abusive

## Campaign Variation Rules

The default monthly model should stay simple, but future campaigns may vary.

Allowed future variation:

- campaign-specific qualifying interaction type
- campaign-specific time window
- campaign-specific winner count
- campaign-specific manual bonus entry if Randy explicitly wants one

What should stay stable even in special campaigns:

- rules should remain understandable
- spam should never help
- more volume should not automatically create much stronger odds

## Suggested Public Explanation

When giveaways become real, the public explanation should be short and plain.

Example direction:

`Each month, a few people who meaningfully participate on the site may be entered into a small giveaway. If your approved interaction qualifies, you get one entry for that month. Extra activity doesn't usually increase your odds.`

That is the kind of clarity the system should aim for.

## Suggested Internal Rule Checklist

Before a campaign goes live, confirm:

- what counts as a qualifying interaction
- whether approval is required
- how many winners there will be
- whether the one-entry-per-month default still applies
- what manual override powers are available
- how suspicious activity will be handled

## Open Questions

- Should every approved writing comment count by default, or only comments that meet a stronger quality threshold?
- Should some campaigns count only specific interaction types?
- Should Randy ever intentionally give bonus entries, or is strict equality the better long-term rule?
- What is the minimum useful public explanation for qualification?
- At what point should participant verification become required for entry creation beyond the current default of giveaway/trust/suspicion cases?

## Recommendation

Keep the default rule simple:

- one approved qualifying interaction
- one monthly entry
- multiple small winners

That rule feels fair, easy to explain, and hard to abuse.

## Current Status

Planned only.

Use this framework to shape future campaign rules once comments and lightweight participant identity are in place.
