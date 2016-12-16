const GameView = require('./game_view.js');

document.addEventListener('DOMContentLoaded', function() {
  let ctx = document.getElementById('game-canvas').getContext('2d');
  new GameView(ctx).start();
});
