module.exports = (function() {

  var Player = function(playerId) {
    this.playerId = playerId;
    this.cycle = null;
  }

  return Player;
})();
