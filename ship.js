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
    get hits() {
      return hits;
    },
    get isSunk(){
      return isSunk();
    },
    hit,
  }
}

function Gameboard() {
  const grid = Array(10).fill(0).map(() => Array(10).fill(null));
  const missedAttacks = [];
  const ships = [];

  const isValidPlacement = (x, y, length, orientation) => {
    if (orientation == "vertical" && y + length > 10) return false;
    if (orientation == "horizontal" && x + length > 10) return false;
    
    for (let i = 0; i < length; i++) {
      if (orientation == "vertical") {
        if (grid[y + i][x] !== null) return false;
      } else {
        if (grid[y][x + i] !== null) return false;
      }

      return true;
    }
  };

  const placeShip = (x, y, ship, orientation) => {
    if (!isValidPlacement(x, y, ship.length, orientation)) {
      return false;
    }

    ships.push(ship);
    for (let i = 0; i < ship.length; i++){
      if(orientation === "vertical"){
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
      if (cellContent.isSunk()) {
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
    return grid.every(row => row.every(cell => cell === null || cell === "Sunk"))
  }

  placeShipsRandomly();
  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
    missedAttacks,
    ships,
  }
}

module.exports = {
 Ship,
 Gameboard
}
