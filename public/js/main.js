window.Tron = {};

require([
    "/js/lib/jquery-1.7.2.min.js",
    "/js/game/game.js",
    "/js/game/player.js",
    "/js/game/cycle.js",
    "/js/game/path.js"], function() {
  var game = new Tron.Game();
  //game.run();
});

