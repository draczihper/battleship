// Ship factory
function Ships() {
   
    return {
        ship: {
            length: Math.floor(Math.random * 5),
            hit: 0,
            isSunk: false,
        },
        
        hit: function () {
            return this.ship.hit++;
        },

        isSunk: function () {
            if (this.ship.length === this.ship.hit) {
                this.ship.isSunk = true,
          }  
        }
    }
}