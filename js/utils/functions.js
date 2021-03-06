function playAudio(path, minNumber, maxNumber) {
  return new Promise(function(resolve, reject) {
    const audio = new Audio(`${path}${randomNumber(minNumber, maxNumber)}.mp3`);
    audio.preload = "auto";
    audio.autoplay = true;           
    audio.onerror = reject;
    audio.onended = resolve;
  });
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

function reset() {
  window.location.href = `${location.protocol}//${location.host}${location.pathname}?r=1`
}

export { playAudio, randomNumber, getCurrentTime, reset };