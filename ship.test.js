const { Ship, Gameboard } = require("./ship.js");

describe("ships factory test", () => {
  test("creates battleship object", () => {
    const battleship = Ship(4)
    expect(battleship.length).toEqual(4);
  });
  test("creates destroyer object", () => {
    const destroyer = Ship(3)
    destroyer.hit()
    destroyer.hit()
    expect(destroyer.hits).toEqual(2);
  });

  test("creates destroyer object", () => {
    const cruiser = Ship(2)
    cruiser.hit()
    cruiser.hit()
    expect(cruiser.isSunk).toEqual(true);
  });
});
/*
  test("increments carrier number of hits", () => {
    const carrier = Ship(3)
    carrier.hit();
    carrier.hit();
    carrier.hit;
    expect(carrier.hits).toEqual(3)
  });

  test("increments cruiser number of hits", () => {
    hit(cruiser)
    hit(cruiser)
    expect(cruiser.hits).toEqual(2)
  });
  test("check if cruiser is sunk", () => {
    expect(isSunk(cruiser)).toEqual(true)
  });
  test("check if battleship is sunk", () => {
    expect(isSunk(battleship)).toEqual(false)
  });
});


describe("game board factory test", () => {
  test("place the ship at a coordinate", () => {
    expect(Gameboard.placeShip(1, 2, carrier.length, "horizontal")).toEqual(`. . . . . . . . . .
. . . . . . . . . .
. 0 0 0 0 0 . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .
. . . . . . . . . .`)
  });
});

*/
