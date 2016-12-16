/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener('DOMContentLoaded', function() {
	  let ctx = document.getElementById('game-canvas').getContext('2d');
	  new GameView(ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  let that = this;
	  setInterval(function () {
	    that.game.step();
	    that.game.draw(that.ctx);
	  }, 20);
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);

	function Game () {
	  this.NUM_ASTEROIDS = 4;
	  this.DIM_X = 1000;
	  this.DIM_Y = 1000;
	  this.asteroids = [];
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

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  for (let i = 0; i < this.asteroids.length; i++) {
	    this.asteroids[i].draw(ctx);
	  }
	};

	Game.prototype.moveObjects = function() {
	  for (let i = 0; i < this.asteroids.length; i++) {
	    this.asteroids[i].move();
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
	  for (let i = 0; i < this.asteroids.length; i++) {
	      let currAsteroid = this.asteroids[i];
	    for (let j = 0; j < this.asteroids.length; j++) {
	      if (i === j ) continue;
	      if (currAsteroid.isCollidedWith(this.asteroids[j])) {
	        currAsteroid.collideWith(this.asteroids[j]);
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

	module.exports = Game;

	// let game = new Game();
	// console.log(game.wrap([1500, -50]));
	// console.log(game.generateRandomPos());


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const utils = __webpack_require__(5);

	function Asteroid(option) {
	  this.COLOR = '#A69899';
	  this.RADIUS = 50;
	  option['color'] = this.COLOR;
	  option['radius'] = this.RADIUS;
	  option['vel'] = utils.randomVec(10);
	  MovingObject.call(this, option);
	  console.log(option);
	}
	utils.inherits(Asteroid, MovingObject);

	module.exports = Asteroid;


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  inherits(child, parent) {
	    function Surrogate () {}
	    Surrogate.prototype = parent.prototype;
	    child.prototype = new Surrogate ();
	    child.prototype.constructor = child;
	  },
	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },
	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};


	module.exports = Util;


/***/ }
/******/ ]);