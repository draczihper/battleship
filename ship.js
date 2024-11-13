function Ship(length) {
  let hits = 0

  const hit = () => {
    hits += 1;
  }

  const isSunk = () => {
    return hits >= length;
  }

  return {
    length,
    hits, 
    isSunk
  }
}

function Gameboard() {
  const grid = Array(10).fill(0).map(() => Array(10).fill('.'));
  const missedAttacks = [];
  const ships = [];

  const placeShip = (x, y, ship, orientation) => {
    if (orientation === "horizontal" && x + ship.length <= 10) {
      for (let i = 0; i < ship.length; i++) {
        grid[y][x + i] = ship;
      }
    } else if (orientation === "vertical" && y + ship.length <= 10) {
      for (let i = 0; i < ship.length; i++) {
        grid[y + i][x] = ship;
      }
    } else {
      throw new Error("Ship cannot be placed without overflowing!");
    }
    ships.push(ship);
  };

  const placeShipsRandomly = () => {
    const shipsLengths = [5, 4, 3, 3, 2];
    for (const length of shipsLengths) {
      let placed = false;
      while (!placed) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const orientation = Math.random < 0.5 ? "Horizontal" : "Vertical"; 

        // Wrap in try-catch block
        placeShip(x, y, Ship(length), orientation);
        placed = true;
      }
    }
  }

  const receiveAttack = (x, y) => {
    const cellContent = grid[y][x];

    if (cellContent === null) {
      missedAttacks.push([x, y])
      return "Miss";
    } else if (cellContent === "Sunk") {
      return "Already sunk";
    } else {
      cellContent.hit();
      if (cellContent.isSunk()) {
        grid[y][x] = "Sunk";
        return "Hit and Sunk";
      } else {
        return "Hit";
      }
    }
  }

  const allShipSunk = () => {
    return grid.every(row => row.every(cell => cell === null || cell === "Sunk"))
  }

  
}

module.exports = {
 
}
