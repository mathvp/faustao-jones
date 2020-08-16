import { BaseScreen } from './baseScreen.js';
import { getCurrentTime } from '../utils/functions.js';

export class GameOverScreen extends BaseScreen {
  constructor(options) {
    super(options);

    const time = document.getElementById('lose-time');
    time.innerHTML = `Precisamente às ${getCurrentTime()}`;
  }
}