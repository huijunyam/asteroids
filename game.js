const Asteroid = require("./asteroid.js");

function Game () {
  this.NUM_ASTEROIDS = 200;
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.generateRandomPos = function () {
  return [Math.floor(Math.random() * this.DIM_X), Math.floor(Math.random() * this.DIM_Y)];
};

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids.push(new Asteroid({game: this, pos: this.generateRandomPos()}));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids[i].move();
  }
};

Game.prototype.wrap = function(pos, radius) {
  if(pos[0] > this.DIM_X - radius) {
    pos[0] = radius;
  }

  if(pos[0] < 0 + radius) {
    pos[0] = this.DIM_X - radius;
  }

  if(pos[1] > this.DIM_Y - radius) {
    pos[1] = radius;
  }

  if(pos[1] < 0 + radius) {
    pos[1] = this.DIM_Y - radius;
  }
  return pos;
};

module.exports = Game;

// let game = new Game();
// console.log(game.wrap([1500, -50]));
// console.log(game.generateRandomPos());
