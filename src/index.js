console.log("HYEYEYEYE");
const createShip = function (len) {
  let length = len;
  let hitCount = 0;
  let isSunk = false;
  let hit = function () {
    this.hitCount += 1;
  };
  let checkIfSunk = function () {
    if (this.length == this.hitCount) {
      this.isSunk = true;
      return this.isSunk;
    }
  };

  return { length, hitCount, isSunk, hit, checkIfSunk };
};

export { createShip };
