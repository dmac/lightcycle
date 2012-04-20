module.exports = (function() {
  var Cycle = require("./cycle")

  var FPS = 30;

  var Game = function(io) {
    this.io = io;
    this.cycles = [];
    this.io.sockets.on("connection", this._onConnection.bind(this));
    this._run();
  };

  Game.prototype.serialize = function() {
    var state = {
      cycles: this.cycles.map(function(cycle) { return cycle.serialize(); })
    }

    return state;
  }

  Game.prototype._run = function() {
    setInterval(function() { this._loop(); }.bind(this), 1000/FPS);
  };

  Game.prototype._loop = function() {
    for (var i = 0; i < this.cycles.length; i++) {
      this.cycles[i].tick();
      console.log(this.serialize());
    }

    this.io.sockets.emit("update", this.serialize());
  };

  Game.prototype._createCycle = function() {
    this.cycles.push(new Cycle());
  }

  Game.prototype._onConnection = function(socket) {
    this._createCycle();
  }

  return Game;
})();
