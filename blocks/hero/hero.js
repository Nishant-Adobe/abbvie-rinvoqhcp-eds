export default function decorate(block) {
  const textDiv = block.querySelector(':scope > div > div');
  if (!textDiv) return;

  const text = textDiv.textContent.trim();

  if (text.includes('COMMITMENT') && text.includes('EXCEPTIONAL ACCESS')) {
    const h1 = document.createElement('h1');
    h1.innerHTML = '<span class="hero-line-1">ABBVIE\'S</span>'
      + '<span class="hero-commitment">COMMITMENT</span>'
      + '<span class="hero-line-3">TO EXCEPTIONAL ACCESS</span>';
    textDiv.replaceChildren(h1);
    block.classList.add('hero-access');
  }
}
