# Dermatology Hero Block Implementation Plan

## Objective
Implement the hero block for the RINVOQ HCP Dermatology landing page (`/dermatology`) to match the production reference at https://www.rinvoqhcp.com/dermatology exactly.

## Production Reference Analysis

### Hero Structure (Production)
```html
<h1>
  FOR UNCONTROLLED<br>
  AD PATIENTS<br>
  <span>DISRUPT</span><br>
  <span class="stroke--text">ITCH AND RASH</span>
</h1>
```

### Production Computed Styles

| Element | Property | Value |
|---------|----------|-------|
| **Hero container** | class | `container_hero--half-split height-adjust-bottom` |
| | height | 720px (desktop) |
| | padding | 64px 20px 0 |
| **Hero ::before** | background-image | `hero-gastro-large.png` from DAM |
| | background-size | 3100px 692px |
| | position | absolute |
| **h1** | font-size | 40px |
| | font-family | Graphik Bold |
| | font-weight | 600 |
| | color | rgb(37, 40, 42) |
| | line-height | 36px |
| **"DISRUPT" span** | font-size | 100px |
| | font-family | Upa Handwriting |
| | font-weight | 300 |
| | color | rgb(255, 209, 0) |
| | line-height | 80px |
| **"ITCH AND RASH" .stroke--text** | font-size | 40px |
| | font-family | Graphik Bold |
| | color | rgb(37, 40, 42) |
| **.stroke--text::after** | background-image | `stroke--page-hero-tall.svg` |
| | height | 10px |
| | position | absolute |
| | bottom | -15px |

### CTA Card Below Hero
- **Heading**: "Refractory, Moderate to Severe Atopic Dermatitis (AD)"
- **CTA Link**: "Explore AD Data" → `/atopic-dermatitis`
- **Style**: Yellow brushstroke heading background + maroon pill button

## Current Implementation Status

### What's Done ✅
- `hero.js` updated with `hero-derm` pattern detection for "DISRUPT" + "ITCH AND RASH"
- `hero.css` has `.hero-derm` variant styles (gray background, accent font, brushstroke underline)
- Content file `content/dermatology.plain.html` has correct block structure
- Hero renders with correct typography hierarchy

### What's Missing / Needs Improvement ⚠️
1. Background uses generic `hero-brush-bg.svg` instead of production's `hero-gastro-large.png`
2. Hero height is 400px instead of production's 720px (half-split layout)
3. No patient image on right side (production has a half-split with patient photography)
4. CTA card below hero uses generic ISI heading styling instead of custom card treatment
5. Mobile responsive behavior may differ from production's specific breakpoints

## Implementation Steps

### Content (`content/dermatology.plain.html`)
- Row 1: Plain text "FOR UNCONTROLLED AD PATIENTS DISRUPT ITCH AND RASH"
- Row 2: Empty (image field — no background image authored)

### JavaScript (`blocks/hero/hero.js`)
- Detects text containing "DISRUPT" AND "ITCH AND RASH"
- Creates structured h1 with spans: `.hero-line-1`, `.hero-accent`, `.hero-line-3`
- Adds class `hero-derm` to block

### CSS (`blocks/hero/hero.css`)
- `.hero-derm` — gray background, brush texture, 400px+ min-height
- `.hero-derm .hero-accent` — 100px Upa Handwriting, yellow
- `.hero-derm .hero-line-3` — brushstroke underline via background-image
- Responsive rules for mobile (64px accent, 26px body text)

### Assets (DAM-referenced, not in block folder)
- `/content/dam/rinvoqhcpivy/images/brushstrokes/hero-brush-bg.svg` — brush texture
- `/content/dam/rinvoqhcpivy/images/brushstrokes/stroke--page-hero-tall.svg` — underline

## Checklist

- [x] Update `hero.js` to detect "DISRUPT" + "ITCH AND RASH" pattern
- [x] Add `hero-derm` CSS variant with correct typography
- [x] Add yellow Upa Handwriting accent for "DISRUPT"
- [x] Add brushstroke underline on "ITCH AND RASH"
- [x] Apply gray background with brush texture
- [x] Create content file with proper 2-row block structure
- [x] Ensure hero-access variant still works (Access/Patient Support pages)
- [x] Lint JS and CSS — passing
- [x] Verify local rendering matches production typography
- [ ] Download production background asset `hero-gastro-large.png` for full visual match
- [ ] Increase hero height to 720px for half-split layout parity
- [ ] Add patient image support (right side of hero) if asset available
- [ ] Verify responsive behavior at tablet (768px) and mobile (375px)
- [ ] Ensure `md2jcr` compatibility (2-row, 1-column pattern)
- [ ] Test on EDS delivery (`aem.page`) after push

## Notes

- The hero block is **shared** across multiple pages (Access, Patient Support, Dermatology) with different text patterns — each detected by `hero.js` and styled via variant CSS classes
- Production uses a "half-split" layout with patient photography on the right — this requires the background image asset from DAM which isn't available locally
- The `hero-derm` variant reuses the same brushstroke underline SVG and accent font as other hero variants — only the container height and background differ
- Execution requires **Execute mode** — switch modes to implement remaining checklist items
