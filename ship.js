function Ship(length){ 
  let hits = 0;

  const hit = () => {
    hits += 1;
  }

  const isSunk = () => {
    return hits >= length;
  }
  

  return {
    length,
    hit,
    isSunk,
    getHits: () => hits
  }
}

function Gameboard() {
  const grid = Array(10).fill(0).map(() => Array(10).fill(null));
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
    for (let i = 0; i < ship.length; i++){
      if(isVertical){
        grid[y + i][x] = ship;
      } else {
        grid[y][x + i] = ship;
      }
    }
    return true;
  };

  const placeShipsRandomly = (ship) => {

    const BOARD_SIZE = 10;
    while (true) {
      const isVertical = Math.random() < 0.5;
      const maxX = isVertical ? BOARD_SIZE - 1 : BOARD_SIZE - ship.length;
      const maxY = isVertical ? BOARD_SIZE - ship.length : BOARD_SIZE - 1;

      const x = Math.floor(Math.random() * (maxX + 1));
      const y = Math.floor(Math.random() * (maxY + 1));
      if (placeShip(x, y, ship, isVertical)){
        return true;
      }
    }
  };
  
  const initializeBoard = () => {
    const shipLengths = [5, 4, 3, 3, 2];

    for (let i = 0; i < 10; i++){
      for (let j = 0; j < 10; j++){
        grid[i][j] = null;
      }
    }
    ships.length = 0;

    for (const length of shipLengths) {
      const ship = Ship(length)
      if(!placeShipsRandomly(ship)){
        return false;
      }
    }
    return true;
  }

  const receiveAttack = (x, y) => {
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return "Invalid coordinates"
    }
    const cellContent = grid[y][x];

    if (cellContent === null) {
      missedAttacks.push([x, y])
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
      return "Hit"
    }
  };

  const allShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  }

  const getGrid = () => {
    return grid.map(row => row.map(cell => {
      if (cell === null) return ".";
      if(cell === "Hit") return "X"
      if (cell === "Sunk") return "#";
      return "O"
    }));
  }

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
    getGrid
  }
}

function Player(type = "human") {
  const gameboard = Gameboard();

  const makeRandomMove = () => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      gameboard.getGrid()[y][x] === "H" ||
      gameboard.getGrid()[y][x] === "X"
    );
    return { x, y };
  };

  const attack = (enemyBoard, x, y){
    if (type === "computer") {
      const move = makeRandomMove();
      return enemyBoard.receiveAttack(move.x, move.y)
      return enemyBoard.attack(x, y);
    }
  }

  return {
    type,
    gameboard,
    attack
  }
}

const board = Gameboard();
board.initializeBoard();

console.log('Initial board setup:');
const displayBoard = board.getGrid()
  .map(row => row.join(' '))
  .join('\n');
console.log(displayBoard);

// Test some attacks
console.log('\nTesting some attacks:');
for (let i = 0; i < 5; i++) {
  const x = Math.floor(Math.random() * 10);
  const y = Math.floor(Math.random() * 10);
  console.log(`Attacking (${x}, ${y}):`, board.receiveAttack(x, y));
}

console.log('\nUpdated board:');
const updatedBoard = board.getGrid()
  .map(row => row.join(' '))
  .join('\n');
console.log(updatedBoard);

module.exports = {
 Ship,
 Gameboard
}