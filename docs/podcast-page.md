# Podcast Page Plan

## Decision

The podcast route should be `/podcasts`, and it should be a podcast hub from the beginning.

Status: implemented for v1.

The YaS Cast can be the featured show for v1, but the page should not be structured as if The YaS Cast is the only possible podcast project. The page should leave room for:

- Shows Randy hosts.
- Shows Randy produces.
- Future shows or limited series.
- Guest appearances on other podcasts.
- Audio experiments or one-off conversations.

## V1 Purpose

The first version of `/podcasts` should help visitors quickly understand Randy's podcast/audio work and give them an easy path to listen.

The page should feel like part of the personal creative site, not like a corporate podcast network page.

Primary job for v1:

- Make it clear that Randy has a podcast people can listen to.
- Feature The YaS Cast clearly as the main show.
- Provide simple listen links.
- Leave room in the architecture for other podcast work without showing empty future sections.

## V1 Content Decisions

- Page title: `Podcasts`.
- Main feature: The YaS Cast.
- Future areas should stay invisible until there is real content.
- V1 should include show description and listen links only.
- Do not include a full episode list, recent RSS feed, or featured episode in the first pass.
- Primary listen links: Spotify and Apple Podcasts.
- Podcast artwork exists as a square 3000 x 3000 image and is used on `/podcasts`.
- Apple Podcasts: `https://podcasts.apple.com/us/podcast/the-yas-cast-yuba-and-sutter-podcast/id1730875855`
- Spotify: `https://open.spotify.com/show/0bjdNEYKS5Zacs32XanGdk`
- Artwork: `src/assets/podcasts/the-yas-cast-artwork.jpg`.
- Current implementation uses Astro's image pipeline to render an optimized version of the artwork.

## The YaS Cast Positioning

The YaS Cast is a podcast dedicated to the Yuba-Sutter area. It features interesting people, political figures, and deeper conversations about Yuba-Sutter and the surrounding areas.

Primary audience:

- People in the Yuba-Sutter area.

Secondary audience:

- General listeners who may enjoy funny, interesting, useful, or thoughtful conversations even if they are not local.

Topics and recurring interests:

- Life
- Relationships
- Spirituality
- Health
- Stories
- Comedy
- Community

## Recommended V1 Structure

1. Page hero
   - Title: `Podcasts`.
   - Short intro that frames this as Randy's home for shows, conversations, and podcast work.
   - Tone should stay curious, personal, and exploratory.

2. Featured show
   - The YaS Cast gets the strongest visual treatment.
   - Include a short human description.
   - Include Spotify and Apple Podcasts links.
   - Include the square podcast artwork.

3. Connect
   - Invite visitors to suggest guests or topics.
   - Include a path for people to request to be a guest.
   - Link to a dedicated request form page instead of embedding the full form on `/podcasts`.

Do not show future podcast categories as placeholder sections in v1.

## Future Structure

Possible future routes:

- `/podcasts` - hub for all podcast/audio work.
- `/podcasts/the-yas-cast` - dedicated show page if the hub gets crowded.
- `/podcasts/the-yas-cast/[episode]` - episode pages if show notes, transcripts, images, links, or related writing become useful.
- `/podcasts/request` - guest/topic/request form.
- `/podcasts/guest-appearances` - optional later, only if there are enough appearances to justify it.

Do not build these routes until the content volume asks for them.

Future podcast categories can include:

- Podcasts Randy produces.
- Additional podcasts Randy starts.
- Podcast episodes where Randy appears as a guest.
- Audio experiments or one-off conversations.

The list can expand later if a real new category appears.

## Content Model Direction

Start manually curated.

V1 does not need an Astro podcast content collection unless the page will include multiple shows, multiple episodes, or repeated podcast cards immediately.

Possible future fields for a podcast/show entry:

- `title`
- `description`
- `role` such as host, producer, guest, or creator
- `status` such as active, occasional, archived, or upcoming
- `artwork`
- `links`
- `featured`
- `sortOrder`

Possible future fields for an episode entry:

- `title`
- `show`
- `description`
- `date`
- `audioUrl`
- `episodeUrl`
- `duration`
- `guests`
- `topics`
- `featured`
- `image`
- `relatedWriting`

## RSS Direction

The YaS Cast RSS feed:

`https://feeds.transistor.fm/the-yas-cast-yuba-and-sutter-podcast`

Recommendation:

- Use manual links/content for v1.
- Add RSS fetching later if the page needs current recent episodes automatically.
- Avoid depending on RSS for the first useful version unless showing recent episodes becomes the core purpose.

## Form Direction

The podcast request flow should let people:

- Suggest a guest.
- Suggest a topic.
- Request to be a guest.

Status: implemented at `/podcasts/request`.

Recommendation:

- Build the request form as its own page: `/podcasts/request`.
- Link to it from `/podcasts` and from any future individual podcast pages.
- Use one form with a request type field rather than separate forms.
- Use Netlify Forms unless there is a reason to add a separate form service.
- Keep it lightweight and low-friction.
- Current implementation uses simple client-side JavaScript to show/hide fields based on request type.
- Include all possible fields in the static form markup so Netlify can detect and accept them.
- Include `request_type` as a submitted field so each submission can be identified.
- Consider setting a hidden `subject` field with JavaScript before submit so email notifications can say whether the submission is a guest request, guest suggestion, or topic suggestion.

Possible form fields:

- Name
- Email
- Request type: guest suggestion, topic suggestion, guest request, other
- Suggested guest or topic
- Why this would make a good episode
- Relevant links
- Bio or background, for guest requests
- Availability or preferred contact method, for guest requests
- Connection to Yuba-Sutter or the topic, if relevant

Netlify Forms notes:

- Netlify Forms can collect a normal static HTML form without custom server code.
- Conditional/dynamic fields are possible on the client side, but every possible submitted field should exist in the form markup.
- Email notifications can be configured in the Netlify UI.
- Netlify submissions can be reviewed in the Netlify dashboard.

## Remaining Questions

- Should the current request form fields be adjusted after Randy reviews the first version?
- Should Netlify email notifications be configured after the site is connected/deployed?
