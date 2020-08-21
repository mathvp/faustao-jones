import { BaseScreen } from './baseScreen.js';
import { reset } from '../utils/functions.js';

export class TitleScreen extends BaseScreen {
  constructor(options) {
    super(options);
  }

  show(options) {
    super.show(options);

    
    const queryString = window.location.search;
    if (queryString == '') {
      alert('Habilite o áudio para uma melhor experiência.');
      reset();
    }

    const audio = document.getElementById('opening-music');
    audio.play();
  }
}
