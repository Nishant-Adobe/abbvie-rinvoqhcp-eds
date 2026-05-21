/**
 * Parser for hero-homepage block variant.
 * Extracts the styled hero heading from the homepage hero container.
 */
export default function parse(element) {
  const h1 = element.querySelector('h1');
  if (!h1) return null;

  const cells = [
    [h1.innerHTML],
  ];

  return {
    blockName: 'hero-homepage',
    cells,
  };
}

export function matches(element) {
  return element.matches('.container_hero-home, .container_hero.container_hero-home, [class*="container_hero-home"]');
}
