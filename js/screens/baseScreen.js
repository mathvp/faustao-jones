import { fadeOut, fadeIn } from '../utils/animations.js';

export class BaseScreen {
  constructor(options) {
    this.id = options.element;
    this.domElement = this.getBaseScreen();
    this.domElement.style.opacity = '0';
    this.parent = this.getParentElement(options.parentElement);
  }

  getBaseScreen() {
    return document.getElementById(this.id);
  }

  getParentElement(parentId) {
    return document.getElementById(parentId);
  }

  getHiddenWrapper() {
    return document.getElementById('hidden-screens');
  }

  clearScreen(fadeOutTime) {
    return new Promise((resolve) => {
      const activeScreen = document.getElementsByClassName('active-screen');

      if (!activeScreen.length)
        resolve();

      this.removeElement(activeScreen[0], fadeOutTime);

      setTimeout(() => resolve(), fadeOutTime);
    });
  }

  show(fadeInTime) {
    this.clearScreen(fadeInTime / 2).then(() => {
      this.domElement.style.transition = `opacity ${fadeInTime}ms`;

      this.parent.appendChild(this.domElement).focus();
      this.domElement.classList.add('active-screen');

      fadeIn(this.domElement);
    });
  }

  hide(fadeOutTime) {
    removeElement(this.domElement, fadeOutTime);
  }

  removeElement(element, fadeOutTime) {
    const hiddenWrapper = this.getHiddenWrapper();

    element.style.transition = `opacity ${fadeOutTime}ms`;

    fadeOut(element, fadeOutTime).then(() => {
      element.classList.remove('active-screen');
      hiddenWrapper.appendChild(element);
    });
  }
}
