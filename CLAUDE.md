# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Adobe AEM Edge Delivery Services (EDS) / Helix project for AbbVie Rinvoq HCP, based on the `aem-boilerplate`. Content is authored in AEM as a Cloud Service and served via Edge Delivery. Local development uses the AEM CLI (`aem up`) which proxies authored content from the mountpoint defined in `fstab.yaml` (currently `author-p160552-e1944799.adobeaemcloud.com/.../abbvie-rinvoqhcp-eds/main`).

Requires Node 18.3.x+ and AEM Cloud Service ≥ `2024.8` / build `17465`.

## Commands

```sh
npm i                  # install
npm run lint           # lint:js (eslint) + lint:css (stylelint)
npm run lint:fix       # autofix both
npm run build:json     # regenerate component-{models,definition,filters}.json from models/ + blocks/*/_*.json
aem up                 # local dev proxy at http://localhost:3000 (requires @adobe/aem-cli installed globally)
```

There is no test suite. ESLint extends `airbnb-base` + `plugin:xwalk/recommended`; CSS uses `stylelint-config-standard`.

## Architecture

### Page lifecycle (`scripts/scripts.js`)
Pages run through three phases driven by `loadPage()`:
1. **Eager** — `decorateMain()` runs `decorateButtons`, `decorateIcons`, `buildAutoBlocks`, `decorateSections`, `decorateBlocks`, then loads the first section so LCP fires fast. Fonts load eagerly only on desktop or if a sessionStorage flag was already set.
2. **Lazy** — header/footer load, remaining sections load, `lazy-styles.css` is injected.
3. **Delayed** — `scripts/delayed.js` is imported after a 3s timeout for non-critical work.

`scripts/aem.js` is the EDS framework runtime — treat it as a vendor file; project code lives in `scripts/scripts.js` and the blocks. `moveInstrumentation()` in `scripts.js` is required whenever a block rewrites DOM structure so universal-editor `data-aue-*` / `data-richtext-*` attributes follow the element to its new home — without it, authoring breaks.

### Blocks (`blocks/<name>/`)
Each block is a self-contained folder of `<name>.js` + `<name>.css`, optionally with `_<name>.json` describing the block's authoring model. `decorateBlocks` discovers them by class name and dynamically imports the JS; the default export `decorate(block)` mutates the DOM in place. `cards.js` is the canonical example: it transforms a div-grid into a `<ul>`/`<li>` and rewrites `<img>` via `createOptimizedPicture` for responsive delivery.

### Authoring model (Universal Editor / Crosswalk)
The three root files `component-models.json`, `component-definition.json`, `component-filters.json` are **generated artifacts** — do not hand-edit. They are merged by `merge-json-cli` from:
- `models/_*.json` for built-in components (page, image, title, text, button, section).
- `blocks/*/_*.json` for each block's own model, definition, and filter.

The husky `pre-commit` hook (`.husky/pre-commit.mjs`) detects staged `_*.json` files, runs `npm run build:json`, and re-stages the generated files automatically. If you edit a model partial, the commit will include the regenerated outputs.

### Other config
- `fstab.yaml` — content source mountpoint (AEM author instance).
- `helix-query.yaml` — generates `/query-index.json` for client-side indexing of pages.
- `helix-sitemap.yaml` — sitemap config.
- `head.html` — injected into every page; CSP nonce is `aem`.
- `.hlxignore` — files excluded from Edge Delivery publishing.

## Conventions

- ESLint enforces `js` extensions in imports (`import x from './foo.js'`, not `./foo`) and Unix line endings.
- Block CSS is scoped via the block class (e.g. `.cards`, `.cards-card-image`); there is no CSS-in-JS or build step for CSS.
- Sidekick extension lives under `tools/sidekick/`.
