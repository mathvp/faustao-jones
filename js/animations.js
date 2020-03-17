function fadeIn(element, transitionTime) {
  requestAnimationFrame(() => {
    setTimeout(() => {
      element.style.opacity = '1';
    });
  });
}

function fadeOut(element, transitionTime) {
  return new Promise((resolve) => {
    element.style.opacity = '0';

    setTimeout(() => {
      resolve();
    }, transitionTime);
  });
}

export { fadeIn, fadeOut };