import { fadeOut, fadeIn } from './animations.js';

function getElement(screenId) {
  return document.getElementById(screenId);
}

function showScreen(screenId, fadeInTime) {
  const screen = getElement(screenId);

  getElement('game').appendChild(screen).focus();
  fadeIn(screen, fadeInTime);
}

function hideScreen(screenId, fadeOutTime) {
  const screen = getElement(screenId);

  fadeOut(screen, fadeOutTime).then(() => {
    getElement('hidden-screens').appendChild(screen);
  });
}

export { showScreen, hideScreen };