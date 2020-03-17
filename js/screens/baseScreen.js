import { fadeOut, fadeIn } from '../animations.js';

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

  show(fadeInTime) {
    this.domElement.style.transition = `opacity ${fadeInTime}ms`;

    this.parent.appendChild(this.domElement).focus();
    fadeIn(this.domElement);
  }

  hide(fadeOutTime) {
    const hiddenWrapper = this.getHiddenWrapper();

    this.domElement.style.transition = `opacity ${fadeOutTime}ms`;

    fadeOut(this.domElement, fadeOutTime).then(() => {
      this.domElement.classList.add('hidden');
      hiddenWrapper.appendChild(this.domElement);
    });
  }
}
