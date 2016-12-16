function MovingObject (option) {
  this.pos = option["pos"];
  this.vel = option["vel"];
  this.radius = option["radius"];
  this.color = option["color"];
  this.game = option["game"];
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  this.pos = this.game.wrap(this.pos, this.radius);
};

MovingObject.prototype.calcDistance = function(pos1, pos2) {
  return Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) +  Math.pow(pos1[1] - pos2[1], 2));
};

MovingObject.prototype.calcNorm = function(pos) {
  return this.calcDistance([0,0], pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let dist = this.calcDistance(this.pos, otherObject.pos);
  let rad = this.radius + otherObject.radius;
  return dist < rad;
};

MovingObject.prototype.collideWith = function (otherObject) {
  this.game.remove(this);
  this.game.remove(otherObject);
};

module.exports = MovingObject;



// const mo = new MovingObject({pos: [30, 30] });
// console.log(mo.calcDistance([0,0], [3, 4]));
//   { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
// );
//
// console.log(mo);
