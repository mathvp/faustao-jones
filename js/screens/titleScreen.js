import { BaseScreen } from './baseScreen.js';

export class TitleScreen extends BaseScreen {
  constructor(options) {
    super(options);
  }

  show(options) {
    super.show(options);

    const audio = new Audio('../audio/opening.mp3');
    //audio.play();
  }
}
