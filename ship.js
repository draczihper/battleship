const Player = require("./player.js")

function Ship(length) {
  let hits = 0;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => {
    return hits >= length;
  };

  return {
    length,
    hit,
    isSunk,
    getHits: () => hits,
  };
}

function Gameboard() {
  const grid = Array(10)
    .fill(0)
    .map(() => Array(10).fill(null));
  const missedAttacks = [];
  const ships = [];

  const isValidPlacement = (x, y, length, isVertical) => {
    if (isVertical && y + length > 10) return false;
    if (!isVertical && x + length > 10) return false;

    for (let i = 0; i < length; i++) {
      const checkX = isVertical ? x : x + i;
      const checkY = isVertical ? y + i : y;
      if (grid[checkY][checkX] !== null) return false;
    }
    return true;
  };

  const placeShip = (x, y, ship, isVertical) => {
    if (!isValidPlacement(x, y, ship.length, isVertical)) {
      return false;
    }

    ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      if (isVertical) {
        grid[y + i][x] = ship;
      } else {
        grid[y][x + i] = ship;
      }
    }
    return true;
  };

  const receiveAttack = (x, y) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "Invalid coordinates";
    }
    const cellContent = grid[y][x];

    if (cellContent === null) {
      missedAttacks.push([x, y]);
      return "Miss";
    } else if (cellContent === "Hit" || cellContent === "Sunk") {
      return "Already attacked this position";
    } else {
      cellContent.hit();
      grid[y][x] = "Hit";

      if (cellContent.isSunk()) {
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            if (grid[i][j] === "Hit" && grid[i][j] === cellContent) {
              grid[i][j] = "Sunk";
            }
          }
        }
        return "Hit and Sunk";
      }
      return "Hit";
    }
  };

  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const getGrid = () => {
    return grid.map((row) =>
      row.map((cell) => {
        if (cell === null) return ".";
        if (cell === "Hit") return "X";
        if (cell === "Sunk") return "#";
        return "O";
      })
    );
  };

  while (!initializeBoard()) {
    // Keep trying until successful
  }

  return {
    placeShip,
    placeShipsRandomly,
    receiveAttack,
    initializeBoard,
    allShipsSunk,
    missedAttacks,
    getGrid,
    ships
  };
}

/*
const human = Player("human");
const computer = Player("computer");

human.gameboard.initializeBoard();
computer.gameboard.initializeBoard();

console.log("Human's board:");
console.log(
  human.gameboard
    .getGrid()
    .map((row) => row.join(" "))
    .join("\n")
);

console.log("\nComputer's board:");
console.log(
  computer.gameboard
    .getGrid()
    .map((row) => row.join(" "))
    .join("\n")
);

console.log("\nHuman attacks computer at (5,5):");
console.log(human.attack(computer.gameboard, 0, 0));

console.log("\nComputer makes random attack:");
console.log(computer.attack(human.gameboard));

console.log("\nUpdated Human's board:");
console.log(
  human.gameboard
    .getGrid()
    .map((row) => row.join(" "))
    .join("\n")
);

console.log("\nUpdated Computer's board:");
console.log(
  computer.gameboard
    .getGrid()
    .map((row) => row.join(" "))
    .join("\n")
);
*/


module.exports = {
  Ship,
  Gameboard,
};
