const Asteroid = require("./asteroid.js");
const Ship = require('./ship.js');

function Game () {
  this.NUM_ASTEROIDS = 4;
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship({pos: this.generateRandomPos, game: this});
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
  for (let i = 0; i < this.allObjects.length; i++) {
    this.allObjects[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  for (let i = 0; i < this.allObjects.length; i++) {
    this.allObjects[i].move();
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

Game.prototype.checkCollisions = function () {
  for (let i = 0; i < this.allObjects.length; i++) {
      let currObj = this.allObjects[i];
    for (let j = 0; j < this.allObjects.length; j++) {
      if (i === j ) continue;
      if (currObj.isCollidedWith(this.allObjects[j])) {
        currObj.collideWith(this.allObjects[j]);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function (asteroid) {
  let index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1);
};

Game.prototype.allObjects = function () {
  return this.asteroids.concat([this.ship]);
};

module.exports = Game;

// let game = new Game();
// console.log(game.wrap([1500, -50]));
// console.log(game.generateRandomPos());
