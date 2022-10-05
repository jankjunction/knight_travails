import Queue from './queue';

class gameSquare {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.possibleMoves = [];
    this.visited = new Boolean();
    this.previous = null;
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

function returnSquare(board, a, b) {
  let boardsize = board.sidesquares * board.sidesquares;
  for (let i = 0; i < boardsize; i += 1) {
    if (board.board[i].x === a && board.board[i].y === b) {
      return board.board[i];
    }
  }
}

const traverse = (start, end) => {
  let path = new Queue();
  path.enqueue(start);
  path.array[0].visited = true;

  const shortestRoute = (result) => {
    let route = [];
    while (result.previous !== null) {
      route.push(result.previous);
      result = result.previous;
    }
    route.reverse();
    route.push(end);
    return route;
  };

  while (path.array.length !== 0) {
    for (let i = 0; i < path.array[0].possibleMoves.length; i += 1) {
      if (path.array[0] === end) {
        return shortestRoute(path.array[0]);
      }
      if (path.array[0].possibleMoves[i].visited !== true) {
        path.enqueue(path.array.concat()[0].possibleMoves[i]);
        if (path.array[0].possibleMoves[i] === start) {
        } else {
          path.array[0].possibleMoves[i].previous = path.array.concat()[0];
        }
        path.array[0].possibleMoves[i].visited = true;
      }
    }
    path.dequeue();
  }
};

const knightMoves = (start, end) => {
  let route = traverse(
    returnSquare(chessBoard, start[0], start[1]),
    returnSquare(chessBoard, end[0], end[1])
  );

  boardReset(chessBoard);
  console.log(`You made it in ${route.length - 1} moves!  Here's your path:`);
  for (let i = 0; i < route.length; i += 1) {
    console.log(`${route[i].x},${route[i].y}`);
  }
  return route;
};

const boardReset = (board) => {
  board.board = [];
  board.buildBoard();
  board.buildMoves();
};

let chessBoard = new gameBoard(8);
chessBoard.buildBoard();
chessBoard.buildMoves();

console.log(knightMoves([0, 0], [4, 2]));
console.log(knightMoves([0, 0], [2, 1]));
console.log(knightMoves([7, 7], [6, 3]));
