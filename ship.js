const MovingObject = require('./moving_object.js');
const utils = require('./utils.js');

function Ship (option) {
  this.RADIUS = 7;
  this.COLOR = '#0DB4C8';
  this.vel = [0, 0];
  option['radius'] = this.RADIUS;
  option['color'] = this.COLOR;
  option['vel'] = this.vel;
  MovingObject.call(this, option);
}

utils.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.generateRandomPos();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
};

module.exports = Ship;
