const Game = require('./game.js');
const Ship = require('./ship.js');
const key = require('./keymaster.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.ship = new Ship();
}

GameView.MOVES = {
  "w": [0, 1],
  "a": [-1, 0],
  "s": [0, -1],
  "d": [1, 0]
};

GameView.prototype.start = function() {
  let that = this;
  this.bindKeyHandlers();
  setInterval(function () {
    that.game.step();
    that.game.draw(that.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  const that = this;
  Object.keys(GameView.MOVES).forEach(k => {
    let move = GameView.MOVES[k];
    key(k, function() { that.ship.power(move); });
  });
  key("space", function() { that.ship.fireBullet(); });
};

module.exports = GameView;
