const MovingObject = require('./moving_object.js');
const utils = require('./utils.js');

function Asteroid(option) {
  this.COLOR = '#A69899';
  this.RADIUS = 5;
  option['color'] = this.COLOR;
  option['radius'] = this.RADIUS;
  option['vel'] = utils.randomVec(10);
  MovingObject.call(this, option);
  console.log(option);
}
utils.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
