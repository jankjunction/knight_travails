class gameSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.possibleMoves = [];
  }

  genPossibleMoves(x = this.x, y = this.y) {
    let moves = [
      //Offset of all possible Knight moves in Chess.
      { x: -2, y: -1 },
      { x: -2, y: 1 },
      { x: 2, y: -1 },
      { x: 2, y: 1 },
      { x: -1, y: -2 },
      { x: -1, y: 2 },
      { x: 1, y: -2 },
      { x: 1, y: 2 },
    ];
    moves.forEach((e) => {
      e.x += x;
      e.y += y;
    });
    moves.forEach((e) => {
      if (e.x >= 0 && e.x < 8 && e.y >= 0 && e.y < 8) {
        this.possibleMoves.push(returnSquare(chessBoard, e.x, e.y));
      }
    });
  }
}

class gameBoard {
  constructor(sidesquares) {
    this.sidesquares = sidesquares;
    this.board = [];
  }
  buildBoard() {
    let x = 0;
    let y = 0;
    while (x < this.sidesquares) {
      while (y < this.sidesquares) {
        let newSquare = new gameSquare(x, y);
        this.board.push(newSquare);
        y += 1;
      }
      x += 1;
      y = 0;
    }
    return this.board;
  }
  buildMoves() {
    this.board.forEach((e) => {
      e.genPossibleMoves();
    });
  }
}

returnSquare = (board, a, b) => {
  let boardsize = board.sidesquares * board.sidesquares;
  for (let i = 0; i < boardsize; i += 1) {
    if (board.board[i].x === a && board.board[i].y === b) {
      return board.board[i];
    }
  }
};

let chessBoard = new gameBoard(8);
chessBoard.buildBoard();
chessBoard.buildMoves();
console.log(chessBoard.board);
