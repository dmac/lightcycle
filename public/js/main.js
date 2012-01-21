window.Tron = {};

require([
    "/js/game/game.js",
    "/js/game/sprite.js",
    "/js/game/path.js"], function() {
  var game = new Tron.Game();
  game.run();
});
