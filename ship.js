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

  
}

module.exports = {
 
}
