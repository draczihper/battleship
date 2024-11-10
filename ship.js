function Ship(length, hits = 0, isSunk = false) {
  return {
    length: length,
    hits: hits,
    isSunk: isSunk,
  }
}

const carrier = Ship(5, 0, false);
const battleship = Ship(4, 0, false);
const submarine = Ship(3, 0, false);
const destroyer = Ship(3, 0, false);
const cruiser = Ship(2, 0, false);

function hit(type) {
  let totalHits = type.hits++;
  return totalHits;
}

function isSunk(type) {
  if (type.length === type.hits) {
    return true;
  } else {
    return false;
  }
}

const shipsArray = [carrier, battleship, destroyer, submarine, cruiser];

function Gameboard() {
  const BOARD_SIZE = 10
  //Game board (ten by ten grid)



  // Random coordinates in a ten by ten grid
  const randomNum = () => {
    const num = Math.floor(Math.random() * 10);
    return num;
  }
  const shipX = randomNum();
  const shipY = randomNum();

  const randomOrientation = () => {
    const num = Math.floor(Math.random() * 2);
    return num === 0 ? "horizontal" : "vertical"
  }
  const orientation = randomOrientation();
  

  // Place ships at a specific coordinate 
  function placeShip(x, y, len, orientation) {
    const grid = Array(10).fill(0).map(() => Array(10).fill("."));

  if (orientation === "horizontal" && shipX + shipLength <= 10) {
    for (let i = 0; i < shipLength; i++){
      grid[shipY][shipX + i] = "0";
    }
  } else if(orientation === "vertical" && shipX + shipLength <= 10) {
    for (let i = 0; i < shipLength; i++){
      grid[shipX + i][shipY] = "0";
    }
  } else {
    console.log("This ship cannot be placed here without overflowing!")
    return;
  }

  const output = grid.map(row => row.join(" ")).join("\n");

  return output;
}
shipsArray.forEach(ship => {
  placeShip(shipX, shipY, ship.length, orientation);
})

}

module.exports = {
  carrier,
  battleship,
  submarine,
  destroyer,
  cruiser,
  hit, 
  isSunk,
  placeShip,
}
