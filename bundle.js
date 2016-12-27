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
	const Ship = __webpack_require__(6);
	const key = __webpack_require__(8);

	function GameView(ctx) {
	  this.game = new Game();
	  this.ctx = ctx;
	  this.ship = new Ship();
	}

	GameView.MOVES = {
	  "w": [0, 1],
	  "a": [-1, 0],
	  "s": [0, -1],
	  "d": [1, 0]
	};

	GameView.prototype.start = function() {
	  let that = this;
	  this.bindKeyHandlers();
	  setInterval(function () {
	    that.game.step();
	    that.game.draw(that.ctx);
	  }, 20);
	};

	GameView.prototype.bindKeyHandlers = function() {
	  const that = this;
	  Object.keys(GameView.MOVES).forEach(k => {
	    let move = GameView.MOVES[k];
	    key(k, function() { that.ship.power(move); });
	  });
	  key("space", function() { that.ship.fireBullet(); });
	};

	module.exports = GameView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

	function Game () {
	  this.NUM_ASTEROIDS = 4;
	  this.DIM_X = 1000;
	  this.DIM_Y = 1000;
	  this.asteroids = [];
	  this.addAsteroids();
	  this.bullets = [];
	  this.ships = [];
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
	      if (i === j) continue;
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const utils = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

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
	  if (this.game.isOutOfBounds(this.pos)) {
	    if (this.isWrappable) {
	      this.pos = this.game.wrap(this.pos, this.radius);
	    } else {
	      this.remove();
	    }
	  }
	};

	MovingObject.prototype.calcDistance = function(pos1, pos2) {
	  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) +  Math.pow(pos1[1] - pos2[1], 2));
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
	  //do nothing
	};

	MovingObject.prototype.remove = function () {
	  this.game.remove(this);
	};

	MovingObject.prototype.isWrappable = true;

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
	  },
	  // Normalize the length of the vector to 1, maintaining direction.
	  dir (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	  // Find distance between two points.
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	  // Find the length of the vector.
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	};


	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const utils = __webpack_require__(5);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const utils = __webpack_require__(5);

	function Bullet(option) {
	  this.RADIUS = 2;
	  option['radius'] = this.RADIUS;
	  MovingObject.call(this, option);
	}

	Bullet.SPEED = 20;

	utils.inherits(Bullet, MovingObject);

	Bullet.prototype.isWrappable = false;

	module.exports = Bullet;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//     keymaster.js
	//     (c) 2011-2013 Thomas Fuchs
	//     keymaster.js may be freely distributed under the MIT license.

	;(function(global){
	  var k,
	    _handlers = {},
	    _mods = { 16: false, 18: false, 17: false, 91: false },
	    _scope = 'all',
	    // modifier keys
	    _MODIFIERS = {
	      '⇧': 16, shift: 16,
	      '⌥': 18, alt: 18, option: 18,
	      '⌃': 17, ctrl: 17, control: 17,
	      '⌘': 91, command: 91
	    },
	    // special keys
	    _MAP = {
	      backspace: 8, tab: 9, clear: 12,
	      enter: 13, 'return': 13,
	      esc: 27, escape: 27, space: 32,
	      left: 37, up: 38,
	      right: 39, down: 40,
	      del: 46, 'delete': 46,
	      home: 36, end: 35,
	      pageup: 33, pagedown: 34,
	      ',': 188, '.': 190, '/': 191,
	      '`': 192, '-': 189, '=': 187,
	      ';': 186, '\'': 222,
	      '[': 219, ']': 221, '\\': 220
	    },
	    code = function(x){
	      return _MAP[x] || x.toUpperCase().charCodeAt(0);
	    },
	    _downKeys = [];

	  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;

	  // IE doesn't support Array#indexOf, so have a simple replacement
	  function index(array, item){
	    var i = array.length;
	    while(i--) if(array[i]===item) return i;
	    return -1;
	  }

	  // for comparing mods before unassignment
	  function compareArray(a1, a2) {
	    if (a1.length != a2.length) return false;
	    for (var i = 0; i < a1.length; i++) {
	        if (a1[i] !== a2[i]) return false;
	    }
	    return true;
	  }

	  var modifierMap = {
	      16:'shiftKey',
	      18:'altKey',
	      17:'ctrlKey',
	      91:'metaKey'
	  };
	  function updateModifierKey(event) {
	      for(k in _mods) _mods[k] = event[modifierMap[k]];
	  };

	  // handle keydown event
	  function dispatch(event) {
	    var key, handler, k, i, modifiersMatch, scope;
	    key = event.keyCode;

	    if (index(_downKeys, key) == -1) {
	        _downKeys.push(key);
	    }

	    // if a modifier key, set the key.<modifierkeyname> property to true and return
	    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
	    if(key in _mods) {
	      _mods[key] = true;
	      // 'assignKey' from inside this closure is exported to window.key
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
	      return;
	    }
	    updateModifierKey(event);

	    // see if we need to ignore the keypress (filter() can can be overridden)
	    // by default ignore key presses if a select, textarea, or input is focused
	    if(!assignKey.filter.call(this, event)) return;

	    // abort if no potentially matching shortcuts found
	    if (!(key in _handlers)) return;

	    scope = getScope();

	    // for each potential shortcut
	    for (i = 0; i < _handlers[key].length; i++) {
	      handler = _handlers[key][i];

	      // see if it's in the current scope
	      if(handler.scope == scope || handler.scope == 'all'){
	        // check if modifiers match if any
	        modifiersMatch = handler.mods.length > 0;
	        for(k in _mods)
	          if((!_mods[k] && index(handler.mods, +k) > -1) ||
	            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
	        // call the handler and stop the event if neccessary
	        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
	          if(handler.method(event, handler)===false){
	            if(event.preventDefault) event.preventDefault();
	              else event.returnValue = false;
	            if(event.stopPropagation) event.stopPropagation();
	            if(event.cancelBubble) event.cancelBubble = true;
	          }
	        }
	      }
	    }
	  };

	  // unset modifier keys on keyup
	  function clearModifier(event){
	    var key = event.keyCode, k,
	        i = index(_downKeys, key);

	    // remove key from _downKeys
	    if (i >= 0) {
	        _downKeys.splice(i, 1);
	    }

	    if(key == 93 || key == 224) key = 91;
	    if(key in _mods) {
	      _mods[key] = false;
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
	    }
	  };

	  function resetModifiers() {
	    for(k in _mods) _mods[k] = false;
	    for(k in _MODIFIERS) assignKey[k] = false;
	  };

	  // parse and assign shortcut
	  function assignKey(key, scope, method){
	    var keys, mods;
	    keys = getKeys(key);
	    if (method === undefined) {
	      method = scope;
	      scope = 'all';
	    }

	    // for each shortcut
	    for (var i = 0; i < keys.length; i++) {
	      // set modifier keys if any
	      mods = [];
	      key = keys[i].split('+');
	      if (key.length > 1){
	        mods = getMods(key);
	        key = [key[key.length-1]];
	      }
	      // convert to keycode and...
	      key = key[0]
	      key = code(key);
	      // ...store handler
	      if (!(key in _handlers)) _handlers[key] = [];
	      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
	    }
	  };

	  // unbind all handlers for given key in current scope
	  function unbindKey(key, scope) {
	    var multipleKeys, keys,
	      mods = [],
	      i, j, obj;

	    multipleKeys = getKeys(key);

	    for (j = 0; j < multipleKeys.length; j++) {
	      keys = multipleKeys[j].split('+');

	      if (keys.length > 1) {
	        mods = getMods(keys);
	      }

	      key = keys[keys.length - 1];
	      key = code(key);

	      if (scope === undefined) {
	        scope = getScope();
	      }
	      if (!_handlers[key]) {
	        return;
	      }
	      for (i = 0; i < _handlers[key].length; i++) {
	        obj = _handlers[key][i];
	        // only clear handlers if correct scope and mods match
	        if (obj.scope === scope && compareArray(obj.mods, mods)) {
	          _handlers[key][i] = {};
	        }
	      }
	    }
	  };

	  // Returns true if the key with code 'keyCode' is currently down
	  // Converts strings into key codes.
	  function isPressed(keyCode) {
	      if (typeof(keyCode)=='string') {
	        keyCode = code(keyCode);
	      }
	      return index(_downKeys, keyCode) != -1;
	  }

	  function getPressedKeyCodes() {
	      return _downKeys.slice(0);
	  }

	  function filter(event){
	    var tagName = (event.target || event.srcElement).tagName;
	    // ignore keypressed in any elements that support keyboard data input
	    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	  }

	  // initialize key.<modifier> to false
	  for(k in _MODIFIERS) assignKey[k] = false;

	  // set current scope (default 'all')
	  function setScope(scope){ _scope = scope || 'all' };
	  function getScope(){ return _scope || 'all' };

	  // delete all handlers for a given scope
	  function deleteScope(scope){
	    var key, handlers, i;

	    for (key in _handlers) {
	      handlers = _handlers[key];
	      for (i = 0; i < handlers.length; ) {
	        if (handlers[i].scope === scope) handlers.splice(i, 1);
	        else i++;
	      }
	    }
	  };

	  // abstract key logic for assign and unassign
	  function getKeys(key) {
	    var keys;
	    key = key.replace(/\s/g, '');
	    keys = key.split(',');
	    if ((keys[keys.length - 1]) == '') {
	      keys[keys.length - 2] += ',';
	    }
	    return keys;
	  }

	  // abstract mods logic for assign and unassign
	  function getMods(key) {
	    var mods = key.slice(0, key.length - 1);
	    for (var mi = 0; mi < mods.length; mi++)
	    mods[mi] = _MODIFIERS[mods[mi]];
	    return mods;
	  }

	  // cross-browser events
	  function addEvent(object, event, method) {
	    if (object.addEventListener)
	      object.addEventListener(event, method, false);
	    else if(object.attachEvent)
	      object.attachEvent('on'+event, function(){ method(window.event) });
	  };

	  // set the handlers globally on document
	  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
	  addEvent(document, 'keyup', clearModifier);

	  // reset modifiers to false whenever the window is (re)focused.
	  addEvent(window, 'focus', resetModifiers);

	  // store previously defined key
	  var previousKey = global.key;

	  // restore previously defined key and return reference to our key object
	  function noConflict() {
	    var k = global.key;
	    global.key = previousKey;
	    return k;
	  }

	  // set window.key and window.key.set/get/deleteScope, and the default filter
	  global.key = assignKey;
	  global.key.setScope = setScope;
	  global.key.getScope = getScope;
	  global.key.deleteScope = deleteScope;
	  global.key.filter = filter;
	  global.key.isPressed = isPressed;
	  global.key.getPressedKeyCodes = getPressedKeyCodes;
	  global.key.noConflict = noConflict;
	  global.key.unbind = unbindKey;

	  if(true) module.exports = assignKey;

	})(this);


/***/ }
/******/ ]);