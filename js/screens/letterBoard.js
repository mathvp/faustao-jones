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
      letterElement.append(`${letter}`);
      this.element.appendChild(letterElement);
    });
  }


}