window.Tron = {};

require([
    "/js/game/game.js",
    "/js/game/sprite.js"], function() {
  var game = new Tron.Game();
  game.run();
});
