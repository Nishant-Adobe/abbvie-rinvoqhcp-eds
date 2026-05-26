# Dermatology Hero Background Image Fix Plan

## Problem
The hero block on the `/dermatology` page is missing its background image in the EDS implementation. The current CSS references `hero-gastro-large.png` via `background-image` directly on the `.hero-derm` element, but the production site uses a **`::before` pseudo-element** to render the background — not a direct `background-image` on the container.

## Root Cause Analysis

### Production Implementation
The production site uses `::before` on `.container_hero--half-split`:
```css
.container_hero--half-split::before {
  content: "";
  position: absolute;
  top: 145px;
  left: 0;
  width: 1280px;    /* viewport width */
  height: 800px;    /* viewport height */
  background-image: url("hero-gastro-large.png");
  background-size: 3100px 692px;
  background-position: 50% 0%;
  background-repeat: no-repeat;
  z-index: -1;
}
```

Key details:
- Background is on `::before`, NOT directly on the element
- `top: 145px` — positioned below the header/nav area
- `width: 1280px` — extends full viewport width (beyond container max-width)
- `z-index: -1` — sits behind all content
- Image is 3100px wide at 692px tall — much wider than viewport to allow the patient photography to show on the right

### Current EDS Implementation
```css
.hero.hero-derm {
  background-image: url('/content/dam/.../hero-gastro-large.png');
  background-size: 3100px 692px;
  background-position: center top;
  overflow: hidden;
}
```

Issues:
1. `overflow: hidden` clips the 3100px background that extends beyond the container
2. The background renders on the element itself instead of `::before` — this means it's constrained to the block's dimensions
3. The `.hero-container .hero-wrapper` has `max-width: unset` and `padding: 0` — but the `.hero` block itself may still be constrained by the default section max-width

### Why the image doesn't show
The `background-size: 3100px 692px` tries to render a 3100px-wide image in a container that may only be ~800px or ~1200px wide. With `overflow: hidden`, the image content gets clipped. Additionally, `background-position: center top` centers the 3100px image — which means the visible portion shows the center of the image (the textured gray background) but the patient photography on the right extends beyond the visible area.

## Fix Strategy

Change from direct `background-image` to a `::before` pseudo-element approach (matching production), OR adjust `background-size` to `cover` which scales the image to fill the container proportionally.

**Recommended: Use `background-size: cover`** — This is the simplest fix and ensures the background fills the hero area regardless of container width. The production uses the fixed-width approach because the image is composited with patient photography that needs specific positioning — but since our downloaded PNG is the full composited image, `cover` will work.

## Files to Modify

- `blocks/hero/hero.css` — Update `.hero.hero-derm` background properties

## Checklist

- [ ] Change `background-size` from `3100px 692px` to `cover` on `.hero.hero-derm`
- [ ] Remove `overflow: hidden` (not needed with `cover`)
- [ ] Optionally add `::before` pseudo-element approach for full-width bleed if needed
- [ ] Verify the background image renders visually at desktop (1280px)
- [ ] Verify responsive behavior at tablet (768px) and mobile (375px)
- [ ] Confirm the `hero-gastro-large.png` asset exists in local DAM path
- [ ] Lint CSS after changes

## Notes

- The `hero-gastro-large.png` asset (33KB) was downloaded from production and exists at `/content/dam/rinvoqhcpivy/images/backgrounds/hero-gastro-large.png`
- The production background image contains both the gray textured brush-stroke pattern AND patient photography composited together — using `cover` will scale both proportionally
- If the patient photography needs to be specifically positioned on the right half, a `::before` approach with `background-position: right center` would be more appropriate
- Execution requires **Execute mode**
