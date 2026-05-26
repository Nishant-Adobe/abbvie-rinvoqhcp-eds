export default function decorate(block) {
  const textDiv = block.querySelector(':scope > div > div');
  if (!textDiv) return;

  const text = textDiv.textContent.trim();

  if (text.includes('COMMITMENT') && text.includes('EXCEPTIONAL')) {
    // Access + Patient Support hero pattern
    const afterExceptional = text.split('EXCEPTIONAL')[1].trim();
    const h1 = document.createElement('h1');
    h1.innerHTML = '<span class="hero-line-1">ABBVIE\'S COMMITMENT TO</span>'
      + '<span class="hero-commitment">EXCEPTIONAL</span>'
      + `<span class="hero-line-3">${afterExceptional}</span>`;
    textDiv.replaceChildren(h1);
    block.classList.add('hero-access');
  } else if (text.includes('DISRUPT') && text.includes('ITCH AND RASH')) {
    // Dermatology landing hero pattern — 4 lines matching production
    const h1 = document.createElement('h1');
    h1.innerHTML = 'FOR UNCONTROLLED<br>AD PATIENTS<br>'
      + '<span class="hero-accent">DISRUPT</span><br>'
      + '<span class="hero-line-3">ITCH AND RASH</span>';
    textDiv.replaceChildren(h1);
    block.classList.add('hero-derm');
  }
}
