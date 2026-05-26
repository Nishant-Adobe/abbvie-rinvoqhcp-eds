# Dermatology CTA Card Styling Plan

## Objective
Style the `div.default-content-wrapper` section containing the "Refractory, Moderate to Severe Atopic Dermatitis (AD)" heading and "Explore AD Data" CTA button to match the production reference at https://www.rinvoqhcp.com/dermatology.

## Element Context

**Selector:** `main > div.section:nth-of-type(2) > div.default-content-wrapper`

**Current HTML:**
```html
<h3>Refractory, Moderate to Severe Atopic Dermatitis (AD)</h3>
<p class="button-container">
  <a href="/atopic-dermatitis" title="Explore AD Data" class="button">Explore AD Data</a>
</p>
```

**Content file:** `content/dermatology.plain.html` (lines 14-20)

## Production Reference Styles

| Element | Property | Value |
|---------|----------|-------|
| **Container** | width | 670px |
| | background | transparent |
| | padding | 0 |
| | position | static (inside hero area on production) |
| **h3 heading** | font-size | 20px |
| | font-weight | 600 (semibold) |
| | color | rgb(37, 40, 42) |
| | font-family | Graphik |
| | background-image | none (no yellow brushstroke here) |
| **CTA link** | background-color | rgb(144, 18, 74) (plum/maroon) |
| | color | white |
| | border-radius | 100px (pill shape) |
| | padding | 16px 54px 16px 32px |
| | font-size | 16px |
| | font-weight | 700 (bold) |

## Current EDS Rendering Issues

1. **h3 gets yellow brushstroke** — The generic ISI heading CSS (`main > .section:not(...)  > .default-content-wrapper > h3:first-child`) applies yellow brushstroke background to this h3, which is incorrect for this section
2. **Button styling is close** — EDS auto-decorates the link as `.button` with plum pill styling (likely already matching due to existing global button styles)
3. **Section positioning** — On production, this card sits *inside* the hero container (overlapping the bottom). In EDS, it's in a separate section below the hero.

## Implementation Approach

### Option A: CSS Override (Minimal change)
Add a CSS rule to prevent the yellow brushstroke from applying to this specific section's h3. The section is `section:nth-of-type(2)` — the first non-hero section on the dermatology page.

### Option B: Section Metadata
Add `data-section-metadata` to this section in the content HTML to give it a distinguishing class (e.g., `cta-card`) that can be styled independently.

### Option C: Move content into hero section
Move the h3 + CTA into the first section (hero section) so it renders as part of the hero area, matching production's layout where this card overlaps the hero bottom.

## Recommended: Option C (most production-accurate)

Move the CTA content into the hero section in the content HTML. This places it visually within the hero area and avoids the ISI heading styling from applying. The `hero.css` can then style it as a positioned element at the bottom of the hero.

## Checklist

- [ ] Move h3 + CTA link from section 2 into section 1 (hero section) in `content/dermatology.plain.html`
- [ ] Add CSS for `.hero.hero-derm` section's h3 (non-hero-heading) to remove yellow brushstroke
- [ ] Style the CTA card within the hero to position at bottom-left
- [ ] Ensure h3 font-size matches production (20px, semibold, no brushstroke)
- [ ] Verify CTA button retains maroon pill styling (100px radius, plum background, white text)
- [ ] Verify the section change doesn't break `md2jcr` model mapping
- [ ] Test at desktop, tablet, and mobile breakpoints

## Notes

- The production page positions this card at the bottom of the 720px hero area using absolute/relative positioning within the hero container
- In EDS, since the hero block only supports the 2-row model structure (text + image), this CTA content should be placed as **default content within the same section** (after the hero block but inside the `hero-container` section)
- Alternatively, it can stay as a separate section but needs CSS to prevent the generic ISI h3 yellow brushstroke from applying
- Execution requires **Execute mode**
