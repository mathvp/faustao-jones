import { BaseScreen } from './baseScreen.js';
import { getCurrentTime } from '../utils/functions.js';

export class WinScreen extends BaseScreen {
  constructor(options) {
    super(options);

    const time = document.getElementById('win-time');
    time.innerHTML = `Precisamente às ${getCurrentTime()}`;
  }
}