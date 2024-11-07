const { carrier, battleship, submarine, destroyer, cruiser, hit, isSunk } = require("./ship.js");

describe("ships factory test", () => {
  test("creates battleship object", () => {
    expect(battleship).toEqual({
      length: 4,
      hits: 0,
      isSunk: false,
    });
  });
  test("creates destroyer object", () => {
    expect(destroyer).toEqual({
      length: 3,
      hits: 0,
      isSunk: false,
    });
  });
  test("increments carrier number of hits", () => {
    hit(carrier)
    hit(carrier)
    hit(carrier)
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
    function placeShip(x, y, length, orientation) {
      const grid = Array.from({ length: 10 }, () => Array(10).fill(".")
      

        
      );
    }
  });

});
