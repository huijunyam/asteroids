const Asteroid = require("./asteroid.js");

function Game () {
  this.NUM_ASTEROIDS = 1000;
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.generateRandomPos = function () {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids.push(new Asteroid(this.generateRandomPos()));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect();
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids[i].move();
  }
};
