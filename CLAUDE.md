# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an **Adobe AEM Edge Delivery Services (EDS)** project using WYSIWYG authoring via AEM Cloud Service. Content is authored in AEM and delivered via the Franklin/Helix CDN. AEM Cloud Service release 2024.8+ (>= 17465) and Node.js 18.3.x+ are required.

The AEM author instance is mounted via `fstab.yaml` at `https://author-p160552-e1944799.adobeaemcloud.com`.

## Commands

```bash
npm i                  # Install dependencies
aem up                 # Start local dev proxy at http://localhost:3000
npm run lint           # Run JS + CSS linting
npm run lint:fix       # Auto-fix linting issues
npm run lint:js        # ESLint only
npm run lint:css       # stylelint only
npm run build:json     # Build all component model JSON files (also runs via pre-commit hook)
```

CI runs on every push: installs deps with `npm ci`, then `npm run lint`.

## Architecture

### Page Load Pipeline

`scripts/scripts.js` orchestrates three phases:
1. **`loadEager()`** — decorates sections/blocks, loads first section immediately (performance-critical path)
2. **`loadLazy()`** — loads header/footer fragments, remaining sections, fonts after first paint
3. **`loadDelayed()`** — loads supplementary code after a 3-second delay

`scripts/aem.js` provides all core utilities: `decorateSections`, `decorateBlocks`, `createOptimizedPicture`, `loadBlock`, `loadFragment`, etc.

### Block Architecture

Each block lives in `blocks/{blockname}/` and follows:
- `{blockname}.js` — default-exported `decorate(block)` function that transforms the DOM
- `{blockname}.css` — scoped block styles
- `_{blockname}.json` — optional content model schema for WYSIWYG authoring

Block JS receives a `<div class="blockname ...">` built from an HTML table. The decorator reshapes it into semantic HTML. Always preserve `data-aue-*` and `data-richtext-*` attributes through DOM mutations — they are required for AEM editor instrumentation.

Use `createOptimizedPicture()` from `aem.js` for all `<img>` elements within blocks.

### Fragment System

Header and Footer are fragment-based blocks. `loadFragment(path)` fetches `{path}.plain.html`, runs the full decoration pipeline on the result, and resets media paths. Fragments are referenced by path from page metadata or block defaults.

### Content Modeling (WYSIWYG)

Models live in two places:
- `models/` — global models (`_page.json`, `_image.json`, `_text.json`, etc.)
- `blocks/{blockname}/_{blockname}.json` — block-specific models

The pre-commit hook (`husky`) runs `npm run build:json` automatically, which merges all block models into:
- `models/_component-models.json`
- `models/_component-definition.json`
- `models/_component-filters.json`

Never edit these three aggregated files directly — they are generated artifacts.

### Styling

Global styles in `styles/styles.css` define the CSS custom property system (`--background-color`, `--text-color`, `--link-color`, etc.). Desktop breakpoint is **900px**. Fonts are in `styles/fonts.css` with `size-adjust` fallbacks for Arial. `styles/lazy-styles.css` is deferred.

## Key Conventions

- **Import paths must include `.js` extension** — `import './aem.js'`, not `'./aem'`
- **Indentation**: 2 spaces in JS/JSON, 4 spaces in CSS (enforced by `.editorconfig`)
- **Unix line endings** (ESLint enforced)
- **ESLint config**: airbnb-base + `eslint-plugin-xwalk`; param reassignment is allowed (needed for block decorators)
- **No runtime npm dependencies** — this is a static site; all JS ships as vanilla ES modules
