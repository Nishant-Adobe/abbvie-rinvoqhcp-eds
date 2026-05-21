/**
 * Parser for cards-support block variant.
 * Extracts patient support cards with gold border accent.
 */
export default function parse(element) {
  const cards = element.querySelectorAll('.cta-card_fluid, [class*="cta-card"]');
  if (!cards.length) return null;

  const rows = [];

  cards.forEach((card) => {
    const img = card.querySelector('img');
    const title = card.querySelector('strong, .card-title');
    const description = card.querySelector('p');
    const cta = card.querySelector('a');

    const imgCell = img ? `<img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt') || ''}">` : '';
    let textCell = '';
    if (title) textCell += `<p><strong>${title.textContent}</strong>`;
    if (description) textCell += ` ${description.textContent.replace(title?.textContent || '', '').trim()}`;
    textCell += '</p>';
    if (cta) textCell += `<p><a href="${cta.getAttribute('href')}">${cta.textContent}</a></p>`;

    rows.push([imgCell, textCell]);
  });

  return {
    blockName: 'cards-support',
    cells: rows,
  };
}

export function matches(element) {
  return element.matches('.multi-column-card.gold, .flexbox-v2.multi-column-card, [class*="multi-column-card"]');
}
