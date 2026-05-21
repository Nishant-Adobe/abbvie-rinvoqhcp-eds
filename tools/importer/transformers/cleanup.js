/**
 * Cleanup transformer — removes unwanted elements from the page DOM before parsing.
 * Removes: header, footer, navigation, brand explorer, cookie banners, modals, analytics scripts.
 */
export default function transform(document) {
  const selectorsToRemove = [
    'header',
    'footer',
    'nav',
    '[role="banner"]',
    '[role="contentinfo"]',
    '.brand-explorer',
    '[class*="brand-explorer"]',
    '[class*="cookie"]',
    '[class*="modal"]',
    '[class*="overlay"]',
    '.floating-isi',
    '[class*="floating-isi"]',
    'script',
    'noscript',
    'style',
    'link[rel="stylesheet"]',
    '[data-cmp-is="experiencefragment"]',
  ];

  selectorsToRemove.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });
}
