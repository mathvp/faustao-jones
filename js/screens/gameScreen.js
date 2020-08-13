import { BaseScreen } from './baseScreen.js';
import words from '../../data/words.js';

export class GameScreen extends BaseScreen {
  constructor(options) {
    super(options);
    this.wordObj = {}
    this.guessWord = [];
    this.currentErrors = 0;
    this.maxErrors = null;
  }

  setupGame() {
    this.wordObj = this.getRandomWordObj();
    this.maxErrors = Math.ceil(this.wordObj.length / 2);

    for(let i = 0; i < this.wordObj.length; i++) {
      this.guessWord.push('_ ');
    }
  }

  getRandomWordObj() {
    const wordsList = JSON.parse(words);
    const randomWordID = Math.floor(Math.random() * wordsList.length);

    return wordsList[randomWordID];
  }

  startGame() {
    this.setupGame();
    this.show(1000);

    this.printGuessWord();

    document.addEventListener('letterClick', (event) => {
      if (!this.lose()) {
        this.compareLetterWord(event.detail, 0, 0);
      }
    });
  }

  printGuessWord() {
    const container = document.getElementById('guess-container');
    container.innerHTML = this.guessWord.join('');
  }

  compareLetterWord(letter, start, hits) {
    const lowerCaseWord = this.wordObj.word.toLowerCase();
    const letterIndex = lowerCaseWord.indexOf(letter.toLowerCase(), start);

    if (letterIndex >= 0) {
      this.guessWord[letterIndex] = letter;
      this.printGuessWord();
      this.compareLetterWord(letter, letterIndex + 1, hits + 1);
    } else if (hits == 0){
      this.currentErrors += 1;
      if (this.lose()) {
        this.gameOver();
      }

    }
  }

  lose() {
    return (this.maxErrors - this.currentErrors) == 0;
  }

  gameOver() {
    alert('Perdeu');
  }

}
