window.Tron.Player = (function() {

  var Player = function(playerId) {
    this.playerId = playerId;
    this.score = 0;
  }

  Player.prototype.draw = function() {
    //console.log(this.playerId + ": " + this.score);
    var $scoreRow = $(".scoreRow[data-player-id=" + this.playerId + "]");
    if ($scoreRow.size() === 0) {
      $scoreRow = $("#scoreBoard").append("" +
        "<div class='scoreRow' data-player-id='" + this.playerId + "'>" +
          "<span class='playerName'>" + this.playerId + "</span>" +
          "<span class='playerScore'>" + 0 +"</span>" +
        "</div>");
    } else {
      $scoreRow.find(".playerScore").html(this.score);
    }
  };

  return Player;
})();
