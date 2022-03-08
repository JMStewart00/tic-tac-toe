class GameController {
  constructor() {
    this.model = new TicTacToe();
    this.view = new View();

    this.view.playEvent.addListener(move => {
      this.model.setBoardState(move);
    });

    this.model.updateCellEvent.addListener(data => {
      this.view.updateCell(data);
    });

    this.model.victoryEvent.addListener(winner => {
      this.view.displayVictory(winner);
    });

    this.model.drawEvent.addListener(() => {
      this.view.displayDraw();
    });

  }

  run() {
    this.view.render();
  }
}