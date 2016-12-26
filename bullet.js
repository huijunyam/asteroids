const MovingObject = require('./moving_object.js');
const utils = require('./utils.js');

function Bullet(option) {
  this.RADIUS = 2;
  option['radius'] = this.RADIUS;
  MovingObject.call(this, option);
}

Bullet.SPEED = 20;

utils.inherits(Bullet, MovingObject);

module.exports = Bullet;
