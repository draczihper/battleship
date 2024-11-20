import Ships from "./ship";

function Gameboard() {
  const BOARD_SIZE = 10;

  function isValid(x, y) {
    return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
  }

  return {
    shipPosition: function (x, y) {
      if (isValid) {
        Ships.carrier;
      }
    },
  };
}
