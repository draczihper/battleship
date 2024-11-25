const { Ship, Gameboard } = require("./ship.js");

describe("ships factory test", () => {
  test("creates battleship object and access its length", () => {
    const battleship = Ship(4)
    expect(battleship.length).toEqual(4);
  });
  test("creates destroyer object and access its hits", () => {
    const destroyer = Ship(3)
    destroyer.hit()
    destroyer.hit()
    expect(destroyer.getHits()).toEqual(2);
  });
  test("creates cruiser object and access its isSunk property", () => {
    const cruiser = Ship(2)
    cruiser.hit()
    cruiser.hit()
    expect(cruiser.isSunk()).toEqual(true);
  });
  test("increments carrier number of hits", () => {
    const carrier = Ship(3)
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.getHits()).toEqual(3)
  });
  test("increments submarine number of hits", () => {
    const submarine = Ship(3);
    submarine.hit()
    submarine.hit()
    submarine.hit(3)
    expect(submarine.getHits()).toEqual(3)
  });
  test("check if submarine is sunk", () => {
    const submarine = Ship(3);
    submarine.hit()
    submarine.hit()
    expect(submarine.isSunk()).toEqual(false)
  });
});

describe("gameboard factory test", () => {
  test("log the game board in the console", () => {
    const grid = Array(10).fill(0).map(() => Array(10).fill("."))
    expect(grid).toEqual([[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]])
  });

  test("check for valid placement of ships in the board", () => {
    const grid = Array(10).fill(0).map(() => Array(10).fill(null));

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
    expect(isValidPlacement(3, 7, 5, "vertical")).toEqual(false)
  });
  test("test ship placement", () => {
    const grid = Array(10).fill(0).map(() => Array(10).fill(null));
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

    const placeship = (x, y, ship, orientation,) => {
      if (!isValidPlacement(x, y, ship.length, orientation)) {
        return false;
      }

      ships.push(ship);
      for (let i = 0; i < ship.length; i++) {
        if (orientation === "vertical") {
          grid[y + i][x] = ship
        } else {
          grid[y][x + i] = ship;
        }
      }

      return true;
    };
    const carrier = Ship(5);
    expect(placeship(3, 7, carrier, "vertical")).toEqual(false);
    expect(placeship(4, 1, carrier, "horizontal")).toEqual(true)
  })
  test("test placing ships randomly", () => {
    const cruiser = Ship(2);
    const placeCruiser = Gameboard().placeShipsRandomly(cruiser)
    expect(placeCruiser).toEqual(true)
  })
  });
