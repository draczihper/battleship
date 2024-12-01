const { Player } = require("./player.js");
const {Gameboard, Ship} = require("./ship.js")

describe("player factory test", () => {
    test("player type", () => {
      const human = Player("human");
      const computer = Player("computer")
      expect(human.type).toEqual("human");
      expect(computer.type).toEqual("computer");
    });
    test("test making a random move", () => {
      const human = Player("human");
      expect(isNaN(human.makeRandomMove())).toEqual(true);
    });
    test("test making an attack", () => {
      const human = Player("human")
      const computer = Player("computer")
  
      expect(human.attack(computer.gameboard, 0, 0)).toEqual("Miss" || "Hit")
    })
  });