import { Ship, Gameboard } from "./ship.js";

function Player(type = "human") {
  const gameboard = Gameboard();

  const placeShipsRandomly = () => {
    const BOARD_SIZE = 10;
    const shipLengths = [5, 4, 3, 3, 2];

    const ships = shipLengths.map(Ship);
    let placed = false
    ships.forEach(ship => {
      while (!placed) {
        const isVertical = Math.random() < 0.5;
        const maxX = isVertical ? BOARD_SIZE - 1 : BOARD_SIZE - ship.length;
        const maxY = isVertical ? BOARD_SIZE - ship.length : BOARD_SIZE - 1;

        const x = Math.floor(Math.random() * (maxX + 1));
        const y = Math.floor(Math.random() * (maxY + 1));
        placed = gameboard.placeShip(x, y, ship, isVertical)
      }
    });
  };

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

  const attack = (enemyBoard, x, y) => {
    if (type === "computer") {
      const move = makeRandomMove();
      return enemyBoard.receiveAttack(move.x, move.y);
    }
    return enemyBoard.receiveAttack(x, y);
  };

  return {
    type,
    gameboard,
    placeShipsRandomly,
    makeRandomMove,
    attack,
  };
}

export default Player;
