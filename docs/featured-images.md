# Featured Image Guide

## Goal

Featured images should make the writing pages feel alive without turning every post into a design project.

The site should have a loose visual family: personal, textured, warm, a little handmade, and flexible enough for both serious essays and dumb jokes.

Do not aim for every image to look identical. Aim for images that feel like they belong in the same room.

## Recommended Style

Use a mix of:

- Real photos from Randy's life.
- Object photos that loosely connect to the piece.
- Simple type or paper-note images.
- Photo-plus-graphic collages.
- Scans, textures, handwriting, screenshots, doodles, and scraps.

The consistency should come from a few repeated choices:

- 16:9 final crop.
- Warm paper/ink feeling.
- Similar color accents to the site: cream, dark ink, yellow, coral, green, and occasional blue.
- Clear subject or visual idea.
- No generic stock-photo energy.
- No over-polished template energy.

## Core Palette

Use the site palette as a loose base, not a strict rulebook.

These hex codes come from the current site color variables in `src/layouts/BaseLayout.astro`.

```text
Ink:        #201713
Paper:      #f8f1e3
Paper Deep: #eadbbf
Blue:       #1f6f8b
Red:        #d94b3d
Yellow:     #f2bd34
Green:      #54784d
Pink:       #e88fa2
```

Recommended usage:

- `#201713` for type, linework, doodles, shadows, and dark anchors.
- `#f8f1e3` for paper backgrounds and negative space.
- `#eadbbf` for secondary paper, warm fills, and soft contrast areas.
- `#f2bd34` for the main energetic accent.
- `#d94b3d` and `#e88fa2` for warmth, underline marks, tape, circles, and small pops.
- `#54784d` for organic accents like scraps, leaves, or grounding shapes.
- `#1f6f8b` for occasional contrast so everything does not drift too warm.

Practical rule:

- Start with `paper` + `ink`.
- Add one main accent color.
- Add a second accent only if the image still feels calm.
- Use blue sparingly.

If a real photo already has strong color, do not force all of these into it. A warm photo plus one or two palette accents is enough.

## Standard Size

Design and export featured images at:

```text
1600 x 900 px
```

This is a 16:9 ratio and gives the site enough resolution for cards and post pages.

If starting from a vertical photo or weird crop, still export the final image as 1600 x 900 px. The site crops all featured images into a stable 16:9 frame, so designing to that shape avoids surprises.

## File Location

Save finished images in:

```text
public/writing/
```

Use lowercase filenames with hyphens:

```text
public/writing/my-post-title-feature.png
public/writing/my-post-title-feature.jpg
```

Then attach the image in the writing frontmatter:

```yaml
image:
  src: "/writing/my-post-title-feature.jpg"
  alt: "Short description of the featured image."
```

Use `.jpg` for photos and `.png` for graphics, type cards, screenshots, or images with sharp edges.

## Fast Image Recipes

Sample images for each recipe live in:

```text
public/writing/samples/
```

They are intentionally generated examples, not final style law. Use them to compare the amount of friction and consistency each approach creates.

### 1. Photo Only

Best for: personal stories, place-based posts, casual notes.

Sample:

![Photo-only sample](/writing/samples/photo-only-sample.png)

Steps:

1. Pick a photo that feels connected to the piece.
2. Crop it to 16:9.
3. Adjust exposure, contrast, and warmth.
4. Export as JPG.

This should be the lowest-friction option.

### 2. Object Metaphor

Best for: funny posts, simple opinions, essays with one strong symbol.

Sample:

![Object-metaphor sample](/writing/samples/object-metaphor-sample.png)

Examples:

- Toilet paper for the single-ply post.
- A notebook for thinking/writing.
- A coffee cup for a morning thought.
- Shoes, keys, a receipt, a chair, a street sign, a messy desk.

Steps:

1. Put one object near a window or simple lamp.
2. Shoot from above or straight-on.
3. Crop to 16:9.
4. Add a warm color block or paper texture if it feels too plain.

### 3. Paper Note

Best for: reflective pieces, short notes, posts with one strong line.

Sample:

![Paper-note sample](/writing/samples/paper-note-sample.png)

Steps:

1. Write one phrase from the piece on paper.
2. Photograph or scan it.
3. Add a colored rectangle, margin, or torn-paper layer.
4. Export as 1600 x 900.

Keep the phrase short. The writing title and card text already do most of the explaining.

### 4. Photo Plus Graphic Shape

Best for: most posts.

Sample:

![Photo-plus-graphic-shape sample](/writing/samples/photo-plus-shape-sample.png)

Steps:

1. Start with a photo or texture.
2. Add one large shape in yellow, coral, green, or cream.
3. Add one small doodle, line, arrow, or paper scrap.
4. Stop before it feels like a poster.

This is probably the best house style for the site: personal enough, designed enough, and not too fussy.

### 5. Simple Type Card

Best for: posts without an obvious image.

Sample:

![Simple-type-card sample](/writing/samples/type-card-sample.png)

Steps:

1. Use a cream or textured background.
2. Add 2-5 words from the post.
3. Use big type, strong contrast, and one accent color.
4. Add one small imperfection: scanned paper, uneven underline, rough edge, or handwriting.

Avoid making every post a type card. They are useful, but too many can make the writing index feel repetitive.

## Affinity Photo 2 Workflow

Use Affinity Photo when the image starts from a photo, scan, screenshot, or texture.

1. Create a new file: `1600 x 900 px`.
2. Place the photo with `File > Place`.
3. Crop or mask the photo to fill the canvas.
4. Add adjustment layers:
   - Curves or Levels for contrast.
   - White Balance or HSL for warmth.
   - Vibrance if the image needs a little life.
5. Add graphic layers only if needed:
   - Rectangle shapes.
   - Paper textures.
   - Simple line work.
   - Short handwritten or typed text.
6. Export:
   - JPG for photo-heavy images.
   - PNG for sharp graphics or text-heavy images.

Suggested exports:

```text
JPG quality: 80-90
PNG: only when needed for sharp graphics
Final size: 1600 x 900 px
```

## Affinity Designer 2 Workflow

Use Affinity Designer when the image is mostly graphic, typographic, or collage-like.

1. Create an artboard: `1600 x 900 px`.
2. Add a background color or paper texture.
3. Add 1-3 visual ingredients:
   - A photo.
   - A big shape.
   - A short phrase.
   - A simple drawn mark.
   - A scanned note or paper scrap.
4. Keep the center area strong, because cards crop and scale down.
5. Export as PNG or JPG.

Designer is usually better than Canva when you want the images to feel custom instead of template-like.

## Canva Free Workflow

Canva Free is useful for quick layout experiments, simple type cards, and fast photo crops.

Suggested use:

1. Create a custom design at `1600 x 900 px`.
2. Upload your own photos/textures.
3. Use simple shapes, not busy templates.
4. Export JPG or PNG.
5. Bring the result into Affinity if you want a more custom final polish.

Be careful with templates. They can make the site feel less personal if the layout is too recognizable.

## Should Canva Pro Be Paid For?

Recommendation: do not pay for Canva Pro yet.

Use Affinity Photo/Designer as the main tool and Canva Free as a convenience tool. Consider Canva Pro later only if it removes friction you keep hitting every week.

Canva Pro may be worth it if:

- You constantly need one-click background removal.
- You want Brand Kit convenience for saved colors, fonts, logos, and repeated assets.
- You frequently need Magic Resize or Magic Switch to make many versions of the same design.
- You rely on Canva's premium stock assets or templates.
- You are making lots of social posts in addition to site images.

Canva Pro is probably not worth it if:

- Most images are personal photos, object photos, scans, or handmade graphics.
- You already prefer working in Affinity.
- You only need one 16:9 image per writing piece.
- You want the site to avoid template energy.

Official Canva notes checked April 23, 2026:

- Canva says Brand Kit is a Pro feature for managing colors, fonts, logos, imagery, graphics, and templates.
- Canva says Background Remover, transparent image downloads, premium content, templates, resize/Magic Switch, and Brand Kit are part of the Pro bundle.

Sources:

- https://www.canva.com/pro/brand-kit/
- https://www.canva.com/pro/background-remover/

## House Style Checklist

Before exporting, ask:

- Is the final image 1600 x 900?
- Does it still work when cropped into a card?
- Does it feel personal or specific?
- Is there one clear visual idea?
- Does it avoid generic stock-photo energy?
- Does it avoid looking like a default Canva template?
- Does it fit the site's warm, handmade, curious feeling?
- Is the alt text accurate and useful?

## Good Defaults

When in doubt:

1. Use a real photo.
2. Crop it 16:9.
3. Warm it up slightly.
4. Add one simple shape or paper texture.
5. Export and move on.

The point is to support the writing, not make every image precious.
