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
  return type.hits + 1;
}

let submarineHits = hit(submarine);

module.exports = {
  submarineHits,
  carrier,
  battleship,
  submarine,
  destroyer,
  cruiser,
  
}
