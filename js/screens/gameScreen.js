import { BaseScreen } from './baseScreen.js';

export class GameScreen extends BaseScreen {
  constructor(options) {
    super(options);
  }

  setupGame() {
    console.log('Setting things up...')
  }

  startGame() {
    this.setupGame();
    this.show(1000);
  }
}
