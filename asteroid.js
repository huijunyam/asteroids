const MovingObject = require('./moving_object.js');
const utils = require('./utils.js');
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Asteroid(option) {
  this.COLOR = '#A69899';
  this.RADIUS = 50;
  option['color'] = this.COLOR;
  option['radius'] = this.RADIUS;
  option['vel'] = utils.randomVec(10);
  MovingObject.call(this, option);
}

utils.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship){
    otherObject.relocate();
    return true;
  } else if (otherObject instanceof Bullet) {
    this.remove();
    otherObject.remove();
    return true;
  }
};

module.exports = Asteroid;
