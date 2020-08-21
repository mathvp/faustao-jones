import { BaseScreen } from './baseScreen.js';
import words from '../../data/words.js';
import { GameOverScreen } from './gameOverScreen.js';
import { WinScreen } from './winScreen.js';
import { playAudio } from '../utils/functions.js';

export class GameScreen extends BaseScreen {
  constructor(options) {
    super(options);
    this.wordObj = {}
    this.guessWord = [];
    this.currentErrors = 0;
    this.maxErrors = null;
    this.hits = 0;
    this.whiteSpaces = 0;
  }

  setupGame() {
    this.wordObj = this.getRandomWordObj();

    this.maxErrors = this.setMaxErrors();

    for(let i = 0; i < this.wordObj.length; i++) {
      if(this.wordObj.word[i].replace(/\s/g,'') == '') {
        this.guessWord.push(' ');
        this.whiteSpaces += 1;
      } else {
        this.guessWord.push('_');        
      }
    }
  }

  setMaxErrors() {
    if (this.wordObj.length >= 10) {
      return Math.ceil(this.wordObj.length / 2);
    } else {
      return Math.ceil(this.wordObj.length / 2) + 2;
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
    this.printAttempts();
    this.setInitialPosition();

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

  printAttempts() {
    const container = document.getElementById('attempts');
    container.innerHTML = `Erros: ${this.currentErrors}/${this.maxErrors}`;
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
        playAudio('../../audio/falas/ganhou-', 1, 4);
        this.winScreen();
      } else {
        if(hits == 0) {
          playAudio('../../audio/falas/acerto-', 1, 6);
        } 
      }

    } else if (hits == 0){
      this.wrong();
    }
    this.printAttempts();
  }

  wrong() {
    this.currentErrors += 1;

    this.downChain(30);

    if (this.lose()) {
      playAudio('../../audio/falas/som-caindo-', 1, 1);
      playAudio('../../audio/falas/perdeu-', 1, 9);    
      this.gameOver();
    } else {
      playAudio('../../audio/falas/erro-', 1, 7);
    }
  }

  downChain(size) {
    const chain = document.getElementById('chain');

    const style = window.getComputedStyle(chain);
    chain.style.marginTop = parseInt(style.marginTop) + size + "px";
  }

  lose() {
    return (this.maxErrors - this.currentErrors) == 0;
  }

  win() {
    return (this.hits == (this.wordObj.length - this.whiteSpaces));
  }

  gameOver() {
    this.downChain(220);
    const gameOverScreen = new GameOverScreen({ element: 'game-over-screen', parentElement: 'game'});

    const board = document.getElementById('letters-board');
    board.style.opacity = '0';

    setTimeout(() => {
      gameOverScreen.show(1000);
    }, 1500);
  }

  winScreen() {
    const winScreen = new WinScreen({ element: 'win-screen', parentElement: 'game'});
    setTimeout(() => {
      winScreen.show(1000);
    }, 1500);
  }

  setInitialPosition() {
    for (let i = 0; i < this.maxErrors; i++) {
      this.downChain(-30);
    }
  }
}
