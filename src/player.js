import { createGameboard } from "./gameboard.js";
const createPlayer = function (type) {
  let playerType = type;
  let gameboard = createGameboard();

  return { playerType, gameboard };
};
export { createPlayer };
