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
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;

    if (isVertical && y + length > 10) return false;
    if (!isVertical && x + length > 10) return false;

    for (let i = -1; i <= length; i++){
      for (let j = -1; i <= 1; j++){
        let checkX = isVertical ? x + j : x + i;
        let checkY = isVertical ? y + i : y + j;

        if (checkX < 0 || checkX > 9 || checkY < 0 || checkY > 9) continue;

        if (grid[checkX][checkY] !== null) return false;
      }
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
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation = Math.random < 0.5 ? "Horizontal" : "Vertical";

      placed = placeShip(x, y, ship, orientation);
    }
  };
  
  const initializeBoard = () => {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach(length => {
      const ship = Ship(length);
      placeShipsRandomly(ship)
    })
  }

  const receiveAttack = (x, y) => {
    const cellContent = grid[y][x];

    if (cellContent === null) {
      missedAttacks.push([x, y])
      return "Miss";
    } else {
      cellContent.hit();
      if (cellContent.isSunk) {
        for (let i = 0; i < 10; i++) {
          for (let i = 0; j < 10; j++) {
            if (grid[j][i] === cellContent) {
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
    return ships.forEach(ship => ship.isSunk());
  }

  const getGrid = () => {
    return grid.map(row => row.map(cell => {
      if (cell === null) return ".";
      if (cell === "Sunk") return "X";
      return "O"
    }));
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
