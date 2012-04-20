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

  Path.prototype.serialize = function() {
    return {
      endpoint: this.endpoint,
      turns: this.turns
    }
  }

  return Path;
})();
