window.Tron.Path = (function() {

  var Path = function(cycle) {
    this.cycle = cycle;
    this.endpoint = [this.cycle.x + this.cycle.width / 2, this.cycle.y + this.cycle.height / 2];
    this.turns = [this.endpoint];
  }

  Path.prototype.draw = function(canvas) {
    var i, context = canvas.getContext("2d");
    context.beginPath();
    context.moveTo(this.turns[0][0], this.turns[0][1]);
    for (i = 1; i < this.turns.length; i++) {
      context.lineTo(this.turns[i][0], this.turns[i][1]);
    }
    context.lineTo(this.endpoint[0], this.endpoint[1]);
    context.stroke();
  };

  return Path;
})();
