import Player from "./player.js"

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
  const missedAttacks = new Set();
  const ships = [];
  const shipPositions = new Map();

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

    if (!ships.includes(ship)) {
      ships.push(ship)
    }

    const shipPositionSet = new Set();
    for (let i = 0; i < ship.length; i++){
      const checkX = isVertical ? x : x + i;
      const checkY = isVertical ? y + i : y;
      grid[checkY][checkX] = ship;
      shipPositionSet.add(`${checkX},${checkY}`)
    }
    shipPositions.set(ship, shipPositionSet);
    return true;
  };

  const receiveAttack = (x, y) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "Invalid coordinates";
    }
  
    const attackKey = `${x},${y}`;
    if (missedAttacks.has(attackKey)) {
      return "Already attacked this position";
    }
  
    const cellContent = grid[y][x];
  
    if (cellContent === null) {
      missedAttacks.add(attackKey);
      return "Miss";
    }
  
    if (typeof cellContent === 'object' && cellContent.hit) {
      cellContent.hit();
      
      grid[y][x] = 'Hit';
      
      if (cellContent.isSunk()) {
        const shipPos = shipPositions.get(cellContent);
        for (let pos of shipPos){
          const [posX, posY] = pos.split(",").map(Number)
          grid[posX, posY] = "Sunk"
        }
        return "Hit and Sunk";
      }
      
      return "Hit";
    }
  
    return "Invalid attack";
  };
  
  const getGrid = () => {
    return grid.map(row => row.map(cell => {
      if (cell === null) return ".";
      if (cell === 'Hit') return "H";
      if (cell === 'Sunk') return "X";
      return "O";
    }));
  };

  const allShipsSunk = () => {
    return ships.every((ship) => ship.isSunk());
  };

  return {
    placeShip,
    receiveAttack,
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


export { Ship, Gameboard };
