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

  
}

module.exports = {
 
}
