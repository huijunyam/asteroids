const MovingObject = require('./moving_object.js');
const utils = require('./utils.js');
const Bullet = require('./bullet.js');

function Ship(option) {
  this.RADIUS = 15;
  this.COLOR = '#0DB4C8';
  this.vel = [0, 0];
  option['color'] = this.COLOR;
  option['radius'] = this.RADIUS;
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

Ship.prototype.fireBullet = function() {
  let norm = utils.norm(this.vel);

  if (norm === 0){
    return;
  }

  let relativeVel = utils.scale(
    utils.dir(this.vel),
    Bullet.SPEED
  );

  let bulletVel = [relativeVel[0] + this.vel[0], relativeVel[1] + this.vel[1]];

  let bullet = new Bullet({
    pos: this.pos,
    vel: bulletVel,
    color: this.color,
    game: this.game
  });

  this.game.add(bullet);
};

module.exports = Ship;
