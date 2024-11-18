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
    expect(destroyer.hits).toEqual(2);
  });
  test("creates cruiser object and access its isSunk property", () => {
    const cruiser = Ship(2)
    cruiser.hit()
    cruiser.hit()
    expect(cruiser.isSunk).toEqual(true);
  });
  test("increments carrier number of hits", () => {
    const carrier = Ship(3)
    carrier.hit();
    carrier.hit();
    carrier.hit();
    expect(carrier.hits).toEqual(3)
  });
  test("increments submarine number of hits", () => {
    const submarine = Ship(3);
    submarine.hit()
    submarine.hit()
    submarine.hit(3)
    expect(submarine.hits).toEqual(3)
  });
  test("check if submarine is sunk", () => {
    const submarine = Ship(3);
    submarine.hit()
    submarine.hit()
    expect(submarine.isSunk).toEqual(false)
  });
});

describe("gameboard factory", () => {
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
});
