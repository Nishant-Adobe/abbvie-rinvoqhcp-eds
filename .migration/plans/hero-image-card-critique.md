# Dermatology Hero CTA Card with Patient Image — Critique & Plan

## Element Under Review

**Selector:** `main > div.section.hero-container:nth-of-type(1) > div.default-content-wrapper:nth-of-type(2)`

**Current EDS HTML:**
```html
<h3>Refractory, Moderate to Severe Atopic Dermatitis (AD)</h3>
<p class="button-container">
  <a href="/atopic-dermatitis" title="Explore AD Data" class="button">Explore AD Data</a>
</p>
```

## Production Reference Analysis

### Structure
The production uses an **image-text card component** (`abbv-image-text-v2`) with:
- A patient photography image as the background/overlay
- Text positioned at `middle-left` over the image
- A CTA link with circle-arrow icon

### Production DOM
```
.derm-home-hero.abbv-image-text-v2.abbv-image-swap
├── .abbv-image-content-container-v2
│   └── <img src="dermatology_home_desktop.png" alt="">
└── .abbv-image-text-content-container-v2.middle-left
    └── .abbv-image-text-content-v2
        └── .abbv-image-text-display-v2
            └── .abbv-stretched-card-body
                ├── <h3 class="card-title title--derm">
                │   ├── <span class="small-text">Refractory, Moderate to Severe</span>
                │   ├── <br>
                │   └── <span>Atopic Dermatitis (AD)</span>
                └── <a href="/atopic-dermatitis">Explore AD Data</a>
```

### Key Image Asset
- **URL:** `https://www.rinvoqhcp.com/content/dam/rinvoqhcpivy/images/dermatology/ad/dermatology_home_desktop.png`
- **Dimensions:** 335×220px (at mobile), scales larger at desktop
- **Content:** Patient photo (man with atopic dermatitis, wearing blue t-shirt, against warm gold background)

### Computed Styles
| Property | Value |
|----------|-------|
| Card display | flex |
| Card width | 335px (mobile) |
| Card height | 220px (mobile) |
| Card position | relative |
| Image overflow | visible (image bleeds above card boundary) |
| Text position | middle-left (absolute positioned over image) |

## Current EDS Issues

1. **Missing patient image** — The CTA card has no background/overlay image. Production shows the AD patient photograph behind the text.
2. **No card layout** — Currently renders as simple h3 + button. Should be a positioned image-text overlay card.
3. **No image-swap behavior** — Production swaps image position based on breakpoint (image fills card area, text overlays at middle-left).

## Implementation Plan

### Approach
Add the patient image to the content HTML (as an `<img>` tag before the h3), then use CSS to position the text over the image (matching the `middle-left` overlay pattern).

### Image to Download
`https://www.rinvoqhcp.com/content/dam/rinvoqhcpivy/images/dermatology/ad/dermatology_home_desktop.png`

Store at: `/content/dam/rinvoqhcpivy/images/dermatology/ad/dermatology_home_desktop.png`

### Content Change (`content/dermatology.plain.html`)
Add image before the h3:
```html
<p><img src="/content/dam/rinvoqhcpivy/images/dermatology/ad/dermatology_home_desktop.png" alt=""></p>
<h3>Refractory, Moderate to Severe Atopic Dermatitis (AD)</h3>
<p><a href="/atopic-dermatitis">Explore AD Data</a></p>
```

### CSS Change (`blocks/hero/hero.css`)
Style `.hero-container .default-content-wrapper` to create the image-text overlay card:
- Image fills the card area
- Text positioned over image at bottom-left
- Maroon CTA button with circle-arrow icon
- Card has rounded corners and proper dimensions

## Checklist

- [ ] Download patient image `dermatology_home_desktop.png` from production to DAM path
- [ ] Add `<img>` to content HTML before the h3 heading
- [ ] Add CSS for image-text overlay card layout in `.hero-container .default-content-wrapper`
- [ ] Position h3 text over image at bottom-left
- [ ] Ensure CTA button retains maroon pill styling with arrow
- [ ] Verify at desktop and mobile breakpoints
- [ ] Lint CSS
- [ ] Verify image doesn't break `md2jcr` (it's in default content, not inside a block table)

## Notes

- The image is **decorative** (empty alt text in production) — this is a patient photo, not informational content
- The card in production has the image filling the entire card area with text overlaid — this is a common "stretched card" pattern
- On desktop, the image is larger and the card occupies the bottom portion of the 720px hero
- On mobile, the card stacks below the heading text
- The patient image has warm gold/yellow tones that complement the RINVOQ brand palette
- Execution requires **Execute mode**
