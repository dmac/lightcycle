module.exports = (function() {

  var Path = function(cycle) {
    this.cycle = cycle;
    this.endpoint = [this.cycle.x + this.cycle.width / 2, this.cycle.y + this.cycle.height / 2];
    this.turns = [this.endpoint];
  }

  Path.prototype.tick = function() {
    this.endpoint = [this.cycle.x + this.cycle.width / 2, this.cycle.y + this.cycle.height / 2];
  }

  Path.prototype.addTurn = function() {
    this.turns.push(this.endpoint);
  };

  Path.prototype.pathSegments = function() {
    var segments = [];
    for (var i = 0; i < this.turns.length - 1; i++) {
      segments.push({
        start: this.turns[i],
        end: this.turns[i+1]
      });
    }
    segments.push({
      start: this.turns[this.turns.length - 1],
      end: this.endpoint
    });
    return segments;
  }

  Path.prototype.serialize = function() {
    return {
      endpoint: this.endpoint,
      turns: this.turns
    }
  }

  return Path;
})();
