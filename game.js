const Asteroid = require("./asteroid.js");
const Ship = require('./ship.js');
const Bullet = require("./bullet.js");

function Game () {
  this.NUM_ASTEROIDS = 4;
  this.DIM_X = 1000;
  this.DIM_Y = 1000;
  this.asteroids = [];
  this.bullets = [];
  this.ships = [];
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

Game.prototype.addShip = function() {
  const ship = new Ship({pos: this.generateRandomPos(), game: this});
  this.ships.push(ship);
  return ship;
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  for (let i = 0; i < this.allObjects.length; i++) {
    this.allObjects[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function(delta) {
  for (let i = 0; i < this.allObjects.length; i++) {
    this.allObjects[i].move(delta);
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
      if (i === j) continue;
      if (currObj.isCollidedWith(this.allObjects[j])) {
        currObj.collideWith(this.allObjects[j]);
      }
    }
  }
};

Game.prototype.step = function (delta) {
  this.moveObjects(delta);
  this.checkCollisions();
};

Game.prototype.allObjects = function () {
  return [].concat(this.ships, this.asteroids, this.bullets);
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(obj), 1);
  } else if (obj instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
  } else if (obj instanceof Ship) {
    this.ships.splice(this.ships.indexOf(obj), 1);
  } else {
    throw "error: not a valid object";
  }
};

Game.prototype.add = function(obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  } else if (obj instanceof Bullet) {
    this.bullets.push(obj);
  } else if (obj instanceof Ship) {
    this.ships.push(obj);
  } else {
    throw "error: not a valid object";
  }
};

Game.prototype.isOutOfBounds = function(pos) {
  return (pos[0] < 0 || pos[0] > this.DIM_X || pos[1] < 0 || pos[1] > this.DIM_Y);
};

module.exports = Game;

// let game = new Game();
// console.log(game.wrap([1500, -50]));
// console.log(game.generateRandomPos());
