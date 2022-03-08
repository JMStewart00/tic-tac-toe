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

class TicTacToe {
  constructor() {
    this.board = Array(9).fill();
    this.currentPlayer = 'X';
    this.finished = false;

    this.updateCellEvent = new Event();
    this.victoryEvent = new Event();
    this.drawEvent = new Event();
  }

  setBoardState(move) {
    if (
      this.finished ||
      move < 0 ||
      this.board[move]
    ) {
      return false;
    }

    this.board[move] = this.currentPlayer;
    this.updateCellEvent.trigger({ move, player: this.currentPlayer });

    this.finished = this.setFinished();

    if (!this.finished) {
      this.setPlayer();
    }

    return true;
  }

  setFinished() {
    // Make sure there's at le
    const victoryCaptured = WIN_CONDITIONS.some((line) => {
      return (
        this.board[line[0]] &&
        this.board[line[0]] === this.board[line[1]] &&
        this.board[line[1]] === this.board[line[2]]
      );
    });

    if (victoryCaptured) {
      this.victoryEvent.trigger(this.currentPlayer);
    }

    const draw = this.board.every(i => i);
    if (draw) {
      this.drawEvent.trigger();
    }

    return victoryCaptured;
  }

  setPlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }
}