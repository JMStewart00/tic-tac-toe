const WIN_CONDITIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // ltr diagonal
  [2, 4, 6], // rtl diagonal
];

class GameState {
  constructor() {
    this.board = Array(9).fill();
    this.currentPlayer = 'X';
    this.finished = false;

    this.updateCellEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();
  }

  setBoardState(move) {
    // disable clicking.
    if (
      this.finished ||
      move < 0 ||
      move > 8 ||
      this.board[move]
    ) {
      return;
    }

    this.board[move] = this.currentPlayer;
    this.updateCellEvent.trigger({ move, player: this.currentPlayer });

    this.finished = this.setFinished();

    if (!this.finished) {
      this.setPlayer();
    }
  }

  setFinished() {
    // Make sure there's a value in the first spot, then compare for equality.
    const victoryCaptured = WIN_CONDITIONS.some((wc) => {
      let firstInWC = wc[0];
      let secondInWC = wc[1];
      let thirdInWC = wc[2];

      return (
        this.board[firstInWC] &&
        this.board[firstInWC] === this.board[secondInWC] &&
        this.board[secondInWC] === this.board[thirdInWC]
      );
    });

    // If winconditions were met trigger the victory for currentPlayer.
    if (victoryCaptured) {
      this.victoryEvent.trigger(this.currentPlayer);
    }

    // if there is something in every part of board and no one wins
    // All the drawEvent to happen.
    const draw = this.board.every(i => i);
    if (draw && !victoryCaptured) {
      this.drawEvent.trigger();
    }

    return victoryCaptured;
  }

  // Switch players between X and O.
  setPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
}