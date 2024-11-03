// Ship factory
function Ships() {
    const ship = {
        length: Math.floor(Math.random * 5),
        hit: 0,
        isSunk: false,
    }
    return {
        hit: function () {
            return this.ship.hit++;
        }
    }
}