# Dermatology Design Replication — Branch & Push Plan

## Overview
Create a new branch `fix/dermatology-design-replication` from the current working state on `aem-20260521-2255`, commit all dermatology design changes, and push to remote.

## Changes to Commit
Files modified during this session:
1. **`blocks/hero/hero.css`** — Hero derm variant: reduced min-height, updated font-weight to 600, replaced background-image underline with `::after` pseudo-element using SVG file, added CTA card h3 span/strong styling
2. **`styles/lazy-styles.css`** — Fixed ISI sub-heading color override (narrowed `h3#isi-safety ~ *` to only target `~ p, ~ ul, ~ ol`), added reference section plum color rule

## Checklist

- [ ] Create new branch `fix/dermatology-design-replication` from current HEAD
- [ ] Stage the two modified files (`blocks/hero/hero.css`, `styles/lazy-styles.css`)
- [ ] Commit with descriptive message summarizing the dermatology design fixes
- [ ] Push branch to remote origin
- [ ] Report the push result and branch URL

## Execution Notes

> **Requires Execute mode** to create the branch, commit, and push. Switch to Execute mode to proceed.
