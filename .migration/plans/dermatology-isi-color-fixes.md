# RINVOQ Dermatology Page — Exact Visual Replication Plan

## Overview
Replicate https://www.rinvoqhcp.com/dermatology exactly in our EDS implementation. This plan documents every computed style from the production page and identifies remaining gaps in the local EDS version.

---

## Production Design Specification (Extracted from Live Site)

### Section 1: Hero Area

| Element | Property | Production Value |
|---------|----------|-----------------|
| **H1 (all lines)** | font-family | "Graphik Bold", "Helvetica Neue", arial, helvetica, sans-serif |
| | font-size | 40px |
| | font-weight | 600 |
| | line-height | 36px |
| | color | rgb(37, 40, 42) |
| | letter-spacing | normal |
| | text-transform | none |
| **"DISRUPT" accent** | font-family | "Upa Handwriting", serif |
| | font-size | 100px |
| | font-weight | 300 |
| | line-height | 80px |
| | color | rgb(255, 209, 0) |
| | display | inline |
| **"ITCH AND RASH" underline** | implementation | `::after` pseudo-element |
| | position | absolute |
| | bottom | -15px |
| | left | 0px |
| | width | 100% of span (352px at desktop) |
| | height | 10px |
| | background-image | `stroke--page-hero-tall.svg` |
| | background-size | 100% |
| **Hero section container** | background-color | rgb(237, 237, 237) |
| | background-image | none visible at desktop |
| | padding | 64px 20px 40px |
| | min-height | content-driven (~260px on production) |

### Section 2: CTA Card (Image-Text Overlay)

| Element | Property | Production Value |
|---------|----------|-----------------|
| **Card container** | border-radius | 16px |
| | overflow | hidden |
| | max-width | 1200px |
| | margin | 20px auto |
| **"Refractory, Moderate to Severe"** | font-size | 14px |
| | font-weight | 600 |
| | color | rgb(255, 255, 255) |
| | line-height | 17.5px |
| **"Atopic Dermatitis (AD)"** | font-size | 24px |
| | font-weight | 600 |
| | color | rgb(255, 255, 255) |
| | line-height | 30px |
| | white-space | nowrap |
| **"Explore AD Data" button** | background-color | rgb(144, 18, 74) |
| | color | rgb(255, 255, 255) |
| | border-radius | 100px |
| | padding | 16px 54px 16px 32px |
| | font-size | 16px |
| | font-weight | 700 |
| | icon | circle-chevron `::after` pseudo-element |

### Section 3: ISI (Important Safety Information)

| Element | Property | Production Value |
|---------|----------|-----------------|
| **ISI section bg** | background-color | rgb(245, 245, 245) |
| | padding | 24px 20px |
| **"IMPORTANT SAFETY INFORMATION & INDICATION"** | font-size | 24px |
| | font-weight | 600 |
| | color | rgb(37, 40, 42) |
| | background-image | `stroke--heading.svg` (via inner span) |
| | padding | 12px 24px |
| | display | inline-block (span) |
| **"INDICATION"** | font-size | 22px |
| | font-weight | 600 |
| | color | rgb(37, 40, 42) |
| | background-image | `stroke--subheading.svg` |
| | padding | 12px 24px |
| | display | inline-block |
| **"IMPORTANT SAFETY INFO FOR RINVOQ..."** | font-size | 22px |
| | font-weight | 600 |
| | color | rgb(37, 40, 42) |
| | background-image | `stroke--heading.svg` |
| | padding | 12px 20px 16px |
| | display | inline-block |
| **Sub-headings (SERIOUS INFECTIONS, etc.)** | font-size | 22px |
| | font-weight | 600 |
| | color | rgb(144, 18, 74) — plum |
| | line-height | 27.5px |
| **Body text** | font-family | Graphik, "Helvetica Neue", arial, helvetica, sans-serif |
| | font-size | 16px |
| | color | rgb(70, 72, 74) |
| | line-height | 24px |

### Section 4: Reference & Footer

| Element | Property | Production Value |
|---------|----------|-----------------|
| **"REFERENCE:" text** | font-size | 16px |
| | font-weight | 400 |
| | color | rgb(144, 18, 74) — plum |
| **Footer** | background-color | rgb(0, 0, 0) |
| | padding | 0px 20px |
| | font-family | Graphik, "Helvetica Neue", arial, helvetica, sans-serif |

---

## Comparison: Production vs Current EDS Implementation

### Already Matching ✓
- Hero H1: font-size 40px, font-weight 600, line-height 36px, color rgb(37, 40, 42) ✓
- "DISRUPT" accent: Upa Handwriting, 100px, weight 300, yellow ✓
- "ITCH AND RASH" stroke: `::after` pseudo with SVG, bottom -15px, height 10px ✓
- Hero background: rgb(237, 237, 237) ✓
- CTA card: border-radius 16px, overflow hidden, max-width 1200px ✓
- CTA h3 span: 14px, weight 600, white ✓
- CTA h3 strong: 24px, weight 600, white, nowrap ✓
- CTA button: plum bg, white text, 100px radius, correct padding ✓
- ISI main heading: 24px, weight 600, yellow bg-image, padding 12px 24px ✓
- ISI sub-headings: 22px, weight 600, plum color ✓
- Body text: 16px, color rgb(70, 72, 74) ✓

### Gaps Requiring Fixes

| # | Issue | Production | Current EDS | File to Fix |
|---|-------|-----------|-------------|-------------|
| 1 | ISI title heading color | rgb(37, 40, 42) — dark charcoal | rgb(37, 40, 42) ✓ already matches | — |
| 2 | ISI "IMPORTANT SAFETY INFO FOR RINVOQ" color | rgb(37, 40, 42) — charcoal | rgb(70, 72, 74) — gray | `styles/lazy-styles.css` |
| 3 | ISI sub-headings color should be plum | rgb(144, 18, 74) | rgb(70, 72, 74) — wrong, shows gray | `styles/lazy-styles.css` |
| 4 | "REFERENCE:" text color | rgb(144, 18, 74) — plum | rgb(70, 72, 74) — gray | `styles/lazy-styles.css` |
| 5 | Production uses actual SVG files for ISI heading brushstrokes (stroke--heading.svg, stroke--subheading.svg) | DAM SVG files | Inline SVG data URIs (functionally equivalent but different visual) | Optional — current works |

---

## Checklist

- [ ] Fix ISI sub-headings color: change from gray `rgb(70, 72, 74)` to plum `rgb(144, 18, 74)` in `styles/lazy-styles.css` for the "SERIOUS INFECTIONS", "MORTALITY", etc. headings on dermatology page
- [ ] Fix "IMPORTANT SAFETY INFORMATION FOR RINVOQ" heading color: change from gray to charcoal `rgb(37, 40, 42)` in `styles/lazy-styles.css`
- [ ] Fix "REFERENCE:" paragraph color: add rule to make it plum `rgb(144, 18, 74)` to match production
- [ ] Verify hero section renders correctly after previous CSS changes (already done in prior session)
- [ ] Verify CTA card image overlay and button render correctly
- [ ] Run CSS linting (`npx stylelint`) to confirm no errors
- [ ] Take final screenshot comparison of local vs production

---

## Execution Notes

> **Requires Execute mode to implement.** Switch to Execute mode to apply the CSS fixes listed in the checklist above. The changes are confined to `styles/lazy-styles.css` — adding/updating color values for ISI headings and reference section text on the dermatology page.
