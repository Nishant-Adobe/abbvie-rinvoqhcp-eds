export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div');
    if (!cell) return;

    const text = cell.textContent.trim();

    if (text.includes('CHALLENGE') && text.includes('TREATMENT GOALS')) {
      // Text row — create styled heading
      row.classList.add('hero-homepage-text-row');
      const h1 = document.createElement('h1');
      h1.innerHTML = '<span class="hero-homepage-line-1">REACH FOR RINVOQ AND</span>'
        + '<span class="hero-homepage-challenge">CHALLENGE</span>'
        + '<span class="hero-homepage-line-3">TREATMENT GOALS</span>';
      cell.replaceChildren(h1);
    } else if (!text && !cell.querySelector('img, picture')) {
      // Empty image row — hide it
      row.classList.add('hero-homepage-img-row');
    }
  });
}
