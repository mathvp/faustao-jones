import { BaseScreen } from './baseScreen.js';
import words from '../../data/words.js';
import { GameOverScreen } from './gameOverScreen.js';
import { WinScreen } from './winScreen.js';

export class GameScreen extends BaseScreen {
  constructor(options) {
    super(options);
    this.wordObj = {}
    this.guessWord = [];
    this.currentErrors = 0;
    this.maxErrors = null;
    this.hits = 0;
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
      this.hits += 1;

      if (this.win()) {
        this.winScreen();
      }

    } else if (hits == 0){
      this.wrong();
    }
  }

  wrong() {
    this.currentErrors += 1;

    this.downChain();

    if (this.lose()) {
      this.gameOver();
    }
  }

  downChain() {
    const chain = document.getElementById('chain');

    const style = window.getComputedStyle(chain);
    chain.style.marginTop = parseInt(style.marginTop) + 30 + "px";
  }

  lose() {
    return (this.maxErrors - this.currentErrors) == 0;
  }

  win() {
    return (this.hits == this.wordObj.length);
  }

  gameOver() {
    const gameOverScreen = new GameOverScreen({ element: 'game-over-screen', parentElement: 'game'});
    gameOverScreen.show(1000);
  }

  winScreen() {
    const winScreen = new WinScreen({ element: 'win-screen', parentElement: 'game'});
    winScreen.show(1000);
  }

}
