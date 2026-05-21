/**
 * Parser for columns-indication block variant.
 * Extracts the 3-column indication category layout.
 */
export default function parse(element) {
  const cards = element.querySelectorAll('.brush-card--home, [class*="brush-card"]');
  if (!cards.length) return null;

  const row = [];

  cards.forEach((card) => {
    const h3 = card.querySelector('h3');
    const links = card.querySelectorAll('a');
    const descriptions = card.querySelectorAll('p');

    let cellContent = '';
    if (h3) cellContent += `<h3>${h3.innerHTML}</h3>`;

    links.forEach((link, i) => {
      cellContent += `<p><a href="${link.getAttribute('href')}">${link.textContent}</a></p>`;
      const desc = descriptions[i];
      if (desc) cellContent += `<p>${desc.textContent}</p>`;
    });

    row.push(cellContent);
  });

  return {
    blockName: 'columns-indication',
    cells: [row],
  };
}

export function matches(element) {
  return element.matches('.brush-card-container, .flexbox-v2.brush-card-container, [class*="brush-card-container"]');
}
