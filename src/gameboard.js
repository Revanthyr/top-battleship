import { createShip } from "./index.js";

const createGameboard = function () {
  let board = [];
  let missedShots = [];
  function fillBoard() {
    for (let x = 0; x <= 9; x++) {
      for (let y = 0; y <= 9; y++) {
        board.push([x, y]);
      }
    }
  }
  fillBoard();
  function placeShip(x, y, len, direction) {
    // goes downward when placing ship
    let newShip = createShip(len);
    if (board[parseInt(x.toString() + y.toString(), 10)].length !== 3) {
      if (direction == "vertical") {
        if (y - (len - 1) >= 0) {
          for (let i = 0; i < len; i++) {
            board[parseInt(x.toString() + (y - i).toString(), 10)].push(
              newShip
            );
          }
        }
      } else {
        if (x - (len - 1) >= 0) {
          for (let i = 0; i < len; i++) {
            board[parseInt((x - i).toString() + y.toString(), 10)].push(
              newShip
            );
          }
        }
      }
    }
  }

  function receiveAttack(x, y) {
    // checks if square has a ship and hits the ship or records missed shot
    let square = board[parseInt(x.toString() + y.toString(), 10)];
    if (square.length == 3) {
      square[2].hit();
    } else {
      missedShots.push([x, y]);
    }
  }
  function areAllShipsSunk() {
    let i = 0;
    let current = board[i];
    let returnValue = true;
    while (current != undefined) {
      if (current.length == 3 && current[2].checkIfSunk() == false) {
        returnValue = false;
        break;
      } else {
        i++;
        current = board[i];
      }
    }
    return returnValue;
    // for each square that has length 3
    // square[3].isSunk()
    // check all ships isSUnk
    // returns true if all ships are sunk
  }
  return { board, placeShip, receiveAttack, missedShots, areAllShipsSunk };

  // be able to report if all ships have been sunk, therefore,
  // must store all ships

  //an array, of double elemtn arrays [[0,0],[0,1]]
  // squaree obkects. create 100 of them, with x and y ranging from 1-10
};
export { createGameboard };
