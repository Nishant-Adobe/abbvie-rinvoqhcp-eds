# Dermatology Page Scrape Analysis

## Page Overview

**URL:** https://www.rinvoqhcp.com/dermatology  
**Title:** RINVOQ® (upadacitinib) Dermatology for Atopic Dermatitis  
**Viewport captured at:** Mobile (375px) — note: the `::before` uses `background--hero-grey-sm.png` (mobile variant)

## Page Structure (3 main content sections)

### Section 1: Hero (`container_hero--half-split`)
- **Container class:** `abbv-container container_hero--half-split height-adjust-bottom`
- **Height:** 470.75px (mobile) / 720px (desktop)
- **Background:** Transparent on element itself
- **`::before` pseudo-element:**
  - **Mobile background:** `background--hero-grey-sm.png` (at mobile viewport)
  - **Desktop background:** `hero-gastro-large.png` (at desktop viewport — confirmed from prior analysis)
  - `background-size: 100%`
  - `position: absolute`
  - `z-index: -1`
  - Extends full page height (`bottom: 7875px`) — covers all content below hero
- **H1 structure:** `FOR UNCONTROLLED` / `AD PATIENTS` / `DISRUPT` (Upa Handwriting span) / `ITCH AND RASH` (.stroke--text span)
- **Additional empty h1 elements:** 2 empty headings (carousel placeholders)

### Section 2: CTA Card (`treatment-area-container`)
- **H3:** "Refractory, Moderate to Severe Atopic Dermatitis (AD)"
- **CTA Link:** "Explore AD Data" → `/atopic-dermatitis`
- **Positioned within the hero container** (not a separate section)

### Section 3: ISI (Important Safety Information)
- Uses `INDICATION` (singular) — dermatology-specific
- Standard ISI structure with all safety headings
- Brushstroke SVG backgrounds on headings (`stroke--cta-block.svg`, `stroke--subheading.svg`)

## Key Background Assets Identified

| Asset | Usage | URL |
|-------|-------|-----|
| `background--hero-grey-sm.png` | Hero `::before` (mobile) | `/content/dam/rinvoqhcpivy/images/backgrounds/background--hero-grey-sm.png` |
| `hero-gastro-large.png` | Hero `::before` (desktop) | `/content/dam/rinvoqhcpivy/images/backgrounds/hero-gastro-large.png` |
| `stroke--cta-block.svg` | ISI main heading highlight | `/content/dam/rinvoqhcpivy/images/brushstrokes/stroke--cta-block.svg` |
| `stroke--subheading.svg` | ISI INDICATION subheading | `/content/dam/rinvoqhcpivy/images/brushstrokes/stroke--subheading.svg` |
| `stroke--heading-isi--mobile.png` | ISI safety heading (mobile) | `/content/dam/rinvoqhcpivy/images/brushstrokes/stroke--heading-isi--mobile.png` |

## Critical Finding: Responsive Background Switch

Production uses **different background images at different breakpoints:**
- **Mobile (≤767px):** `background--hero-grey-sm.png` — smaller, optimized gray texture
- **Desktop (≥768px):** `hero-gastro-large.png` — full 3100px composited image with patient photography

This explains why our current implementation with `background-size: 3100px 692px` doesn't show at mobile — the production uses a completely different image file at mobile.

## Checklist

- [ ] Download mobile-specific background: `background--hero-grey-sm.png`
- [ ] Implement responsive background-image switch (mobile vs desktop assets)
- [ ] Use `::before` pseudo-element approach instead of direct `background-image`
- [ ] Set `background-size: cover` for mobile asset, `3100px 692px` for desktop
- [ ] Ensure `::before` extends below hero to cover ISI section (matching production's `bottom: -7875px` pattern)
- [ ] Verify both desktop and mobile backgrounds render correctly
- [ ] Lint CSS after implementation

## Notes

- The production `::before` uses `top: 145px` (desktop) / `top: 216px` (mobile) — this is offset below the navigation bar
- The `::before` extends to cover the ENTIRE page below the hero (`bottom: -7875px`) — it's a page-level background texture, not just the hero section
- The `z-index: -1` ensures it sits behind all content
- Our EDS implementation should use a media query to switch between `background--hero-grey-sm.png` (mobile) and `hero-gastro-large.png` (desktop)
- Execution requires **Execute mode**
