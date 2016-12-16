const Asteroid = require("./asteroid.js");

function Game () {
  this.NUM_ASTEROIDS = 2;
  this.DIM_X = 300;
  this.DIM_Y = 300;
  this.asteroids = [];
  this.addAsteroids();
  console.log(this.asteroids[5]);
}

Game.prototype.generateRandomPos = function () {
  return [Math.floor(Math.random() * this.DIM_X), Math.floor(Math.random() * this.DIM_Y)];
};

Game.prototype.addAsteroids = function () {
  for (let i = 0; i < this.NUM_ASTEROIDS; i++){
    this.asteroids.push(new Asteroid({pos: this.generateRandomPos()}));
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
    if(this.asteroids[i].pos[0] > this.DIM_X) {
      this.asteroids[i].pos[0] = 0;
    }

    if(this.asteroids[i].pos[0] < 0) {
      this.asteroids[i].pos[0] = this.DIM_X;
    }

    if(this.asteroids[i].pos[1] > this.DIM_Y) {
      this.asteroids[i].pos[1] = 0;
    }

    if(this.asteroids[i].pos[1] < 0) {
      this.asteroids[i].pos[1] = this.DIM_Y;
    }

  }
};

module.exports = Game;

// let game = new Game();
// console.log(game.generateRandomPos());
