import { createShip } from "./ship.js";
import { createGameboard } from "./gameboard.js";
import { createPlayer } from "./player.js";
const _ = require("lodash");
const BODY = document.querySelector("body");
const LEFT_BOARD = document.querySelector(".left-board");
const RIGHT_BOARD = document.querySelector(".right-board");
let turn = 2; // pair is player's turn
const domManager = function (playerType, player) {
  let board;

  if (playerType == "player") {
    board = LEFT_BOARD;
  } else {
    board = RIGHT_BOARD;
  }
  function renderBoard() {
    board.innerHTML = "";
    player.gameboard.board.forEach(function (curr) {
      let div = document.createElement("div");

      div.classList.add("square");
      if (curr.length > 2) {
        div.addEventListener("click", handleShipClick);
      } else {
        div.addEventListener("click", handleSquareClick);
      }
      if (playerType == "player" && curr.length > 2) {
        div.classList.add("ship");
      }
      let test = [curr[0].toString(), curr[1].toString()];

      if (
        _.some(player.gameboard.allShots, (current) =>
          _.isEqual(test, current)
        ) &&
        curr.length == 3
      ) {
        div.classList.add("hit");
      } else if (
        _.some(player.gameboard.allShots, (current) =>
          _.isEqual(test, current)
        ) &&
        curr.length == 2
      ) {
        div.classList.add("hit-square");
      }
      div.setAttribute("x", curr[0]);
      div.setAttribute("y", curr[1]);
      board.appendChild(div);
    });
  }
  function handleShipClick(event) {
    let coordinates = [
      event.target.getAttribute("x"),
      event.target.getAttribute("y"),
    ];
    if (playerType == "player") {
      console.log("it aint your turn");
      return;
    } else if (
      _.some(player.gameboard.allShots, (current) =>
        _.isEqual(coordinates, current)
      )
    ) {
      return;
    } else {
      player.gameboard.receiveAttack(
        event.target.getAttribute("x"),
        event.target.getAttribute("y")
      );
      renderBoard();

      turn += 1;
      if (gameOver() == true) {
        return;
      }
      playComputerTurn();
    }
  }
  function gameOver() {
    if (computer.gameboard.areAllShipsSunk() == true) {
      console.log("PLAYER HAS WON GG");
      let p = document.createElement("p");
      p.textContent = "player wonnnnn";
      BODY.appendChild(p);
      let leftboard = document.querySelector(".left-board");
      let rightboard = document.querySelector(".right-board");
      leftboard.childNodes.forEach(function (curr) {
        curr.removeEventListener("click", handleShipClick);
        curr.removeEventListener("click", handleSquareClick);
      });
      rightboard.childNodes.forEach(function (curr) {
        curr.removeEventListener("click", handleShipClick);
        curr.removeEventListener("click", handleSquareClick);
      });

      return true;
    } else if (player1.gameboard.areAllShipsSunk() == true) {
      let p = document.createElement("p");
      p.textContent = "computaaaa wonnnnn";
      BODY.appendChild(p);
      let leftboard = document.querySelector(".left-board");
      let rightboard = document.querySelector(".right-board");
      leftboard.childNodes.forEach(function (curr) {
        curr.removeEventListener("click", handleShipClick);
        curr.removeEventListener("click", handleSquareClick);
      });
      rightboard.childNodes.forEach(function (curr) {
        curr.removeEventListener("click", handleShipClick);
        curr.removeEventListener("click", handleSquareClick);
      });
      // turn off event listeners
      // player1 = createPlayer("player");
      // computer = createPlayer("computer");
      // player1.gameboard.placeShip(4, 5, 3, "horizontal");
      // computer.gameboard.placeShip(4, 6, 3, "horizontal");
      // playerDom = domManager("player", player1);
      // computerDom = domManager("computer", computer);
      // // playerDom.renderBoard();
      // computerDom.renderBoard();

      return true;
    }
  }
  function playComputerTurn() {
    //picks random number that hasn't already been picked
    let i = Math.floor(Math.random() * 100);
    let square = [
      player1.gameboard.board[i][0].toString(),
      player1.gameboard.board[i][1].toString(),
    ];
    console.log(
      _.some(computer.gameboard.allShots, (current) =>
        _.isEqual(square, current)
      )
    );
    while (
      ////DEBUG THE COMPUTER SHOOTING AT SAME PLACE ALL THE TIME
      _.some(player1.gameboard.allShots, (current) =>
        _.isEqual(square, current)
      )
    ) {
      i = Math.floor(Math.random() * 100);
      square = [
        player1.gameboard.board[i][0].toString(),
        player.gameboard.board[i][1].toString(),
      ];
    }
    player1.gameboard.receiveAttack(
      player1.gameboard.board[i][0].toString(),
      player1.gameboard.board[i][1].toString()
    );
    console.log(player1.gameboard.allShots);
    console.log(computer.gameboard.allShots);
    gameOver();
    playerDom.renderBoard();
    turn += 1;
  }
  function handleSquareClick(event) {
    let coordinates = [
      event.target.getAttribute("x"),
      event.target.getAttribute("y"),
    ];
    if (playerType == "player") {
      console.log("it aint your turn");
      return;
    } else if (
      _.some(player.gameboard.allShots, (current) =>
        _.isEqual(coordinates, current)
      )
    ) {
      return;
    } else {
      player.gameboard.receiveAttack(
        event.target.getAttribute("x"),
        event.target.getAttribute("y")
      );
      renderBoard();

      turn += 1;
      playComputerTurn();
    }
  }

  return { renderBoard, handleShipClick, handleSquareClick };
};
let player1, computer, playerDom, computerDom;
function newGame() {
  let p = document.querySelectorAll("p");
  p.forEach(function (curr) {
    if (curr != null) {
      curr.textContent = "";
    }
  });

  player1 = createPlayer("player");
  computer = createPlayer("computer");
  let shipsList = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  shipsList.forEach(function (current) {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);
    let direction = Math.floor(Math.random() * 2);
    if (direction == 0) {
      direction = "vertical";
    } else direction = "horizontal";
    while (player1.gameboard.placeShip(x, y, current, direction) !== true) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
    }

    player1.gameboard.placeShip(x, y, current, direction);
    x = Math.floor(Math.random() * 9);
    y = Math.floor(Math.random() * 9);
    direction = Math.floor(Math.random() * 2);
    if (direction == 0) {
      direction = "vertical";
    } else direction = "horizontal";
    while (computer.gameboard.placeShip(x, y, current, direction) !== true) {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
    }
    computer.gameboard.placeShip(x, y, current, direction);
  });

  playerDom = domManager("player", player1);
  computerDom = domManager("computer", computer);
  playerDom.renderBoard();
  computerDom.renderBoard();
}
let resetButton = document.querySelector(".reset-btn");
resetButton.addEventListener("click", newGame);
newGame();
