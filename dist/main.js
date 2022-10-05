/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/queue.js":
/*!**********************!*\
  !*** ./src/queue.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Queue {
  constructor() {
    this.array = [];
  }
  enqueue(value) {
    return this.array.push(value);
  }
  dequeue() {
    return this.array.shift();
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Queue);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _queue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queue */ "./src/queue.js");


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
  let path = new _queue__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
      if (!path.array.includes(path.array[0].possibleMoves[i])) {
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

let chessBoard = new gameBoard(8);
chessBoard.buildBoard();
chessBoard.buildMoves();

console.log(
  traverse(returnSquare(chessBoard, 3, 3), returnSquare(chessBoard, 4, 3))
);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsS0FBSyxFQUFDOzs7Ozs7O1VDWnJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxjQUFjO0FBQ3RCLFFBQVEsYUFBYTtBQUNyQixRQUFRLGFBQWE7QUFDckIsUUFBUSxZQUFZO0FBQ3BCLFFBQVEsY0FBYztBQUN0QixRQUFRLGFBQWE7QUFDckIsUUFBUSxhQUFhO0FBQ3JCLFFBQVEsWUFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsOENBQUs7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQix3Q0FBd0M7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3F1ZXVlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUXVldWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFycmF5ID0gW107XG4gIH1cbiAgZW5xdWV1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLmFycmF5LnB1c2godmFsdWUpO1xuICB9XG4gIGRlcXVldWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXkuc2hpZnQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWV1ZTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFF1ZXVlIGZyb20gJy4vcXVldWUnO1xuXG5jbGFzcyBnYW1lU3F1YXJlIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnBvc3NpYmxlTW92ZXMgPSBbXTtcbiAgICB0aGlzLnZpc2l0ZWQgPSBuZXcgQm9vbGVhbigpO1xuICAgIHRoaXMucHJldmlvdXMgPSBudWxsO1xuICB9XG5cbiAgZ2VuUG9zc2libGVNb3Zlcyh4ID0gdGhpcy54LCB5ID0gdGhpcy55KSB7XG4gICAgbGV0IG1vdmVzID0gW1xuICAgICAgLy9PZmZzZXQgb2YgYWxsIHBvc3NpYmxlIEtuaWdodCBtb3ZlcyBpbiBDaGVzcy5cbiAgICAgIHsgeDogLTIsIHk6IC0xIH0sXG4gICAgICB7IHg6IC0yLCB5OiAxIH0sXG4gICAgICB7IHg6IDIsIHk6IC0xIH0sXG4gICAgICB7IHg6IDIsIHk6IDEgfSxcbiAgICAgIHsgeDogLTEsIHk6IC0yIH0sXG4gICAgICB7IHg6IC0xLCB5OiAyIH0sXG4gICAgICB7IHg6IDEsIHk6IC0yIH0sXG4gICAgICB7IHg6IDEsIHk6IDIgfSxcbiAgICBdO1xuICAgIG1vdmVzLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUueCArPSB4O1xuICAgICAgZS55ICs9IHk7XG4gICAgfSk7XG4gICAgbW92ZXMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgaWYgKGUueCA+PSAwICYmIGUueCA8IDggJiYgZS55ID49IDAgJiYgZS55IDwgOCkge1xuICAgICAgICB0aGlzLnBvc3NpYmxlTW92ZXMucHVzaChyZXR1cm5TcXVhcmUoY2hlc3NCb2FyZCwgZS54LCBlLnkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5jbGFzcyBnYW1lQm9hcmQge1xuICBjb25zdHJ1Y3RvcihzaWRlc3F1YXJlcykge1xuICAgIHRoaXMuc2lkZXNxdWFyZXMgPSBzaWRlc3F1YXJlcztcbiAgICB0aGlzLmJvYXJkID0gW107XG4gIH1cbiAgYnVpbGRCb2FyZCgpIHtcbiAgICBsZXQgeCA9IDA7XG4gICAgbGV0IHkgPSAwO1xuICAgIHdoaWxlICh4IDwgdGhpcy5zaWRlc3F1YXJlcykge1xuICAgICAgd2hpbGUgKHkgPCB0aGlzLnNpZGVzcXVhcmVzKSB7XG4gICAgICAgIGxldCBuZXdTcXVhcmUgPSBuZXcgZ2FtZVNxdWFyZSh4LCB5KTtcbiAgICAgICAgdGhpcy5ib2FyZC5wdXNoKG5ld1NxdWFyZSk7XG4gICAgICAgIHkgKz0gMTtcbiAgICAgIH1cbiAgICAgIHggKz0gMTtcbiAgICAgIHkgPSAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ib2FyZDtcbiAgfVxuICBidWlsZE1vdmVzKCkge1xuICAgIHRoaXMuYm9hcmQuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgZS5nZW5Qb3NzaWJsZU1vdmVzKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmV0dXJuU3F1YXJlKGJvYXJkLCBhLCBiKSB7XG4gIGxldCBib2FyZHNpemUgPSBib2FyZC5zaWRlc3F1YXJlcyAqIGJvYXJkLnNpZGVzcXVhcmVzO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJvYXJkc2l6ZTsgaSArPSAxKSB7XG4gICAgaWYgKGJvYXJkLmJvYXJkW2ldLnggPT09IGEgJiYgYm9hcmQuYm9hcmRbaV0ueSA9PT0gYikge1xuICAgICAgcmV0dXJuIGJvYXJkLmJvYXJkW2ldO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCB0cmF2ZXJzZSA9IChzdGFydCwgZW5kKSA9PiB7XG4gIGxldCBwYXRoID0gbmV3IFF1ZXVlKCk7XG4gIHBhdGguZW5xdWV1ZShzdGFydCk7XG4gIHBhdGguYXJyYXlbMF0udmlzaXRlZCA9IHRydWU7XG5cbiAgY29uc3Qgc2hvcnRlc3RSb3V0ZSA9IChyZXN1bHQpID0+IHtcbiAgICBsZXQgcm91dGUgPSBbXTtcbiAgICB3aGlsZSAocmVzdWx0LnByZXZpb3VzICE9PSBudWxsKSB7XG4gICAgICByb3V0ZS5wdXNoKHJlc3VsdC5wcmV2aW91cyk7XG4gICAgICByZXN1bHQgPSByZXN1bHQucHJldmlvdXM7XG4gICAgfVxuICAgIHJvdXRlLnJldmVyc2UoKTtcbiAgICByb3V0ZS5wdXNoKGVuZCk7XG4gICAgcmV0dXJuIHJvdXRlO1xuICB9O1xuXG4gIHdoaWxlIChwYXRoLmFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5hcnJheVswXS5wb3NzaWJsZU1vdmVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAocGF0aC5hcnJheVswXSA9PT0gZW5kKSB7XG4gICAgICAgIHJldHVybiBzaG9ydGVzdFJvdXRlKHBhdGguYXJyYXlbMF0pO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoLmFycmF5LmluY2x1ZGVzKHBhdGguYXJyYXlbMF0ucG9zc2libGVNb3Zlc1tpXSkpIHtcbiAgICAgICAgcGF0aC5lbnF1ZXVlKHBhdGguYXJyYXkuY29uY2F0KClbMF0ucG9zc2libGVNb3Zlc1tpXSk7XG4gICAgICAgIGlmIChwYXRoLmFycmF5WzBdLnBvc3NpYmxlTW92ZXNbaV0gPT09IHN0YXJ0KSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGF0aC5hcnJheVswXS5wb3NzaWJsZU1vdmVzW2ldLnByZXZpb3VzID0gcGF0aC5hcnJheS5jb25jYXQoKVswXTtcbiAgICAgICAgfVxuICAgICAgICBwYXRoLmFycmF5WzBdLnBvc3NpYmxlTW92ZXNbaV0udmlzaXRlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHBhdGguZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5sZXQgY2hlc3NCb2FyZCA9IG5ldyBnYW1lQm9hcmQoOCk7XG5jaGVzc0JvYXJkLmJ1aWxkQm9hcmQoKTtcbmNoZXNzQm9hcmQuYnVpbGRNb3ZlcygpO1xuXG5jb25zb2xlLmxvZyhcbiAgdHJhdmVyc2UocmV0dXJuU3F1YXJlKGNoZXNzQm9hcmQsIDMsIDMpLCByZXR1cm5TcXVhcmUoY2hlc3NCb2FyZCwgNCwgMykpXG4pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9