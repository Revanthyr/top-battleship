import { fill, some } from "lodash";
import { createShip } from "./ship.js";

const createGameboard = function () {
  let board = [];
  let missedShots = [];
  let allShots = [];
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
            if (
              board[parseInt(x.toString() + (y - 1).toString(), 10)].length == 3
            ) {
              return false;
            }
          }
          for (let i = 0; i < len; i++) {
            if (
              board[parseInt(x.toString() + (y - i).toString(), 10)].length == 3
            ) {
              for (let j = 0; j < i; j++) {
                board[parseInt(x.toString() + (y - j).toString(), 10)].pop();
              }

              return false;
            }
            board[parseInt(x.toString() + (y - i).toString(), 10)].push(
              newShip
            );
            console.log(
              `ship was placed at coords: ${board[parseInt(x.toString() + (y - i).toString(), 10)]}`
            );
          }
          return true;
        }
      } else {
        if (x - (len - 1) >= 0) {
          for (let i = 0; i < len; i++) {
            if (
              board[parseInt((x - i).toString() + y.toString(), 10)].length == 3
            ) {
              return false;
            }
          }
          for (let i = 0; i < len; i++) {
            board[parseInt((x - i).toString() + y.toString(), 10)].push(
              newShip
            );
            console.log(
              `ship was placed at coords: ${board[parseInt(x.toString() + (y - i).toString(), 10)]}`
            );
          }
          return true;
        }
      }
    }
  }

  function receiveAttack(x, y) {
    // checks if square has a ship and hits the ship or records missed shot
    let square = board[parseInt(x.toString() + y.toString(), 10)];
    if (square.length == 3) {
      square[2].hit();
      allShots.push([x, y]);
    } else {
      missedShots.push([x, y]);
      allShots.push([x, y]);
    }
  }
  function reset(password) {
    if (password == "banana") {
      allShots = [];
      missedShots = [];

      board = []; // does get filled smh
      fillBoard();
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
  }
  return {
    board,
    placeShip,
    receiveAttack,
    missedShots,
    areAllShipsSunk,
    allShots,
    reset,
    fillBoard,
  };
};
export { createGameboard };
