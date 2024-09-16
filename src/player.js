import { createGameboard } from "./gameboard";
const createPlayer = function (type) {
  let playerType = type;
  let gameboard = createGameboard();

  return { playerType, gameboard };
};
export { createPlayer };
