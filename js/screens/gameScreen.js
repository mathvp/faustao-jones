import { BaseScreen } from './baseScreen.js';
import words from '../../data/words.js';

export class GameScreen extends BaseScreen {
  constructor(options) {
    super(options);
    const wordObj = {}
  }

  setupGame() {
    this.wordObj = this.getRandomWordObj();
  }

  getRandomWordObj() {
    const wordsList = JSON.parse(words);
    const randomWordID = Math.floor(Math.random() * wordsList.length);

    return wordsList[randomWordID];
  }

  startGame() {
    this.setupGame();
    this.show(1000);
  }
}
