const { submarineHits, carrier, battleship, submarine, destroyer, cruiser, submarineHits } = require("./ship.js");

describe("ships factory test", () => {
  test("creates carrier object", () => {
    expect(carrier).toEqual({
      length: 5,
      hits: 0,
      isSunk: false,
    });
  });
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
  test("creates submarine object", () => {
    expect(submarine).toEqual({
      length: 3,
      hits: 0,
      isSunk: false,
    });
  });
  test("creates cruiser object", () => {
    expect(cruiser).toEqual({
      length: 2,
      hits: 0,
      isSunk: false,
    });
  });
  test("increments number of hits", () => {
    expect(submarineHits).toEqual(1)
  });
  test("increments number of hits", () => {
    expect(submarineHits).toEqual(2)
  });
});

