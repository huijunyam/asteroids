const Game = require('./game.js');
const Ship = require('./ship.js');
const key = require('./keymaster.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
  this.ship = this.game.addShip();
}

GameView.MOVES = {
  "w": [0, 1],
  "a": [-1, 0],
  "s": [0, -1],
  "d": [1, 0]
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  this.lastTime = 0;
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function() {
  const that = this;
  Object.keys(GameView.MOVES).forEach(k => {
    let move = GameView.MOVES[k];
    key(k, function() { that.ship.power(move); });
  });
  key("space", function() { that.ship.fireBullet(); });
};

GameView.prototype.animate = function(time) {
  const delta = time - this.lastTime;
  this.game.step(delta);
  this.game.draw(this.ctx);
  this.lastTime = time;
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
