window.Tron.Player = (function() {

  var Player = function(playerId) {
    this.playerId = playerId;
    this.score = 0;
    this.color = "FFFFFF";
  }

  Player.prototype.draw = function() {
    var $scoreRow = $(".scoreRow[data-player-id=" + this.playerId + "]");
    if ($scoreRow.size() === 0) {
      $scoreRow = $("#scoreBoard").append("" +
        "<div class='scoreRow' data-player-id='" + this.playerId + "' style='color: #" + this.color + "'>" +
          "<span class='playerName'>" + this.playerId + "</span>" +
          "<span class='playerScore'>" + this.score +"</span>" +
        "</div>");
    } else {
      $scoreRow.find(".playerScore").html(this.score);
    }
  };

  return Player;
})();
