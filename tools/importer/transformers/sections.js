/**
 * Sections transformer — identifies section boundaries in the page.
 * Adds section breaks (--- dividers) between major page sections.
 */
export default function transform(document) {
  const main = document.querySelector('main') || document.body;

  const sectionSelectors = [
    '.container_hero-home',
    '.brush-card-container',
    '[class*="resource-container"]',
    '[class*="abbv-inline-use"]',
    '[class*="abbv-inline-safety"]',
    '[class*="references"]',
  ];

  sectionSelectors.forEach((selector) => {
    const el = main.querySelector(selector);
    if (el) {
      const hr = document.createElement('hr');
      el.parentNode.insertBefore(hr, el);
    }
  });
}
