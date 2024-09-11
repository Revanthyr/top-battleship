import { createShip } from "./index.js";

const createGameboard = function () {
  let board = [];
  function fillBoard() {
    for (let x = 0; x <= 9; x++) {
      for (let y = 0; y <= 9; y++) {
        board.push([x, y]);
      }
    }
  }
  fillBoard();
  function placeShip(x, y, len, direction) {
    let newShip = createShip(len);
    if (direction == "vertical") {
      if (x - (len - 1) >= 0) {
        for (let i = 0; i < len; i++) {
          board[parseInt((x - i).toString() + y.toString(), 10)].push(newShip);
        }
      }
    } else {
      if (y - (len - 1) >= 0) {
        for (let i = 0; i < len; i++) {
          board[parseInt(x.toString() + (y - i).toString(), 10)].push(newShip);
        }
      }
    }
  }
  return { board, placeShip };
  //should be able to place ships by using createShip
  //receiveAttack : takes coordinates, determines wether or not it hit and
  //send hit function or records coordinaters of missed shot

  //array to keep track of missed shots,
  // be able to report if all ships have been sunk, therefore,
  // must store all ships

  //an array, of double elemtn arrays [[0,0],[0,1]]
  // squaree obkects. create 100 of them, with x and y ranging from 1-10
};
export { createGameboard };
