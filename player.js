import { Ship, Gameboard } from "./ship.js";

function Player(type = "human") {
  const gameboard = Gameboard();

  const placeShipsRandomly = () => {
    const BOARD_SIZE = 10;
    const shipLengths = [5, 4, 3, 3, 2];

    const ships = shipLengths.map(Ship);
    ships.forEach(ship => {
      let placed = false
      while (!placed) {
        const isVertical = Math.random() < 0.5;
        const x = Math.floor(Math.random() * 10)
        const y = Math.floor(Math.random() * 10)
        /*
        const maxX = isVertical ? BOARD_SIZE - 1 : BOARD_SIZE - ship.length;
        const maxY = isVertical ? BOARD_SIZE - ship.length : BOARD_SIZE - 1;

        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        */
        placed = gameboard.placeShip(x, y, ship, isVertical)
      }
    });
  };

  const makeRandomAttack = (enemyBoard) => {
    const previousHits = [];
    const adjacentOffsets = [
      [1, 0], [0, -1], [0, 1], [-1, 0]
    ];

    if(previousHits.length > 0){
      const lastHit = previousHits[previousHits.length - 1]
      for (let [dx, dy] of adjacentOffsets){
        const x = lastHit.x + dx;
        const y = lastHit.y + dy;

        if(x >= 0 && x < 10 && y >= 0  && y < 10){
          if(!Array.from(enemyBoard.missedAttacks).some(key => key === `${x},${y}`)){
            return { x, y, result: enemyBoard.receiveAttack(x, y)}
          }
        }
      }
    }
    let x, y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (Array.from(enemyBoard.missedAttacks).some(
      key => key === `${x},${y}`
    ));
    return { x, y, result: enemyBoard.receiveAttack(x, y) };
  };

/*   const attack = (enemyBoard, x, y) => {
    if (type === "computer") {
      const move = makeRandomMove();
      return enemyBoard.receiveAttack(move.x, move.y);
    }
    return enemyBoard.receiveAttack(x, y);
  }; */

  return {
    type,
    gameboard,
    placeShipsRandomly,
    makeRandomAttack,
    //attack,
  };
}

export default Player;
