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
    function placeShip(shipX, shipY, shipLength, orientation) {

      const grid = Array.from({ length: 10 }, () => Array(10).fill("."))
    

        if (orientation === "horizontal" && shipX + shipLength <= 10) {
          for (let i = 0; i < shipLength; i++){
            grid[shipY][shipX + i] = "0";
          }
        } else if (orientation === "vertical" && shipY + shipLength <= 10) {
          for (let i = 0; i <= shipLength; i++){

            grid[shipY + i][shipX] = "0";
          }
        } else {
          console.log("Ship can't be place at that coordinate without overflowing!")
        }

      for (let y = 0; y < 10; y++){
        let row = "";
        for (let x = 0; x < 10; x++){
          row += grid[y][x] + " ";
        }
        console.log(row);
      }
    }
    expect(placeship(1, 2, carrier.length, "horizontal")).toEqual(
. . . . . . . . . . 
. . . . . . . . . . 
. 0 0 0 0 0 . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 

    )
  });
});
