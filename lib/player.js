module.exports = (function() {

  var Player = function(playerId) {
    this.playerId = playerId;
    this.cycle = null;
    this.score = 0;
  }

  Player.prototype.serialize = function() {
    return {
      playerId: this.playerId,
      score: this.score
    }
  }

  return Player;
})();
