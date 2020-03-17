class Main {
  constructor(config) {
    this.id = config.id;
    this.width = config.width;
    this.height = config.height;

    this.setGameWidth(this.width);
    this.setGameHeight(this.height);
  }

  getGame() {
    return document.getElementById(this.id);
  }

  setGameWidth(width) {
    const game = this.getGame();
    game.style.width = `${width}px`;
  }

  setGameHeight(height) {
    const game = this.getGame();
    game.style.height = `${height}px`;
  }
}
