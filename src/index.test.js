import { createShip } from "./index.js";
import { createGameboard } from "./gameboard.js";

let boat = createShip(2);
test("boat gets hit", () => {
  boat.hit();
  boat.hit();
  expect(boat.checkIfSunk()).toBe(true);
});
test("board array is filled", () => {
  let board = createGameboard();
  expect(board.board[0]).toStrictEqual([0, 0]);
});
test("board array is filled", () => {
  let board = createGameboard();
  expect(board.board[99]).toStrictEqual([9, 9]);
});
test("places ship vertically", () => {
  let board = createGameboard();
  board.placeShip(4, 5, 3, "vertical");
  expect(board.board[45]).toHaveLength(3);
  expect(board.board[35]).toHaveLength(3);
  expect(board.board[25]).toHaveLength(3);
});
test("places ship horizontally", () => {
  let board = createGameboard();
  board.placeShip(4, 5, 3, "horizontal");
  expect(board.board[45]).toHaveLength(3);
  expect(board.board[44]).toHaveLength(3);
  expect(board.board[43]).toHaveLength(3);
});
test("places ship without crossing borders", () => {
  let board = createGameboard();
  board.placeShip(1, 5, 3, "vertical");
  expect(board.board[15]).toHaveLength(2);
  expect(board.board[5]).toHaveLength(2);
  expect(board.board[43]).toHaveLength(2);
});
