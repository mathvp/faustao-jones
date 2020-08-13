import letters from '../../data/letters.js';

export class LetterBoard {
  constructor(options) {
    this.element = document.getElementById(options.element);
    this.insertLetters();
  }

  insertLetters() {
    letters.forEach((letter) => {
      const letterElement = document.createElement('div');
      letterElement.setAttribute('class', `letter letter-${letter}`);
      letterElement.setAttribute('data-value', `${letter}`);
      letterElement.append(`${letter}`);

      letterElement.addEventListener('click', (event) => {
        this.selectLetter(event.target);
      });
      this.element.appendChild(letterElement);
    });
  }

  selectLetter(letterElement) {
    if (letterElement.dataset.disabled) {
      return;
    }

    const clickedLetter = letterElement.dataset.value;

    letterElement.classList.add('clicked')
    letterElement.setAttribute('data-disabled', 'true');

    const event = new CustomEvent('letterClick', { detail: clickedLetter });
    document.dispatchEvent(event);
  }
}