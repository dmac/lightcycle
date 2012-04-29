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
      //console.log(this.serialize());
    }

    this.io.sockets.emit("update", this.serialize());
  };

  Game.prototype._createCycle = function(playerId) {
    this.cycles.push(new Cycle(playerId));
  }

  Game.prototype._onConnection = function(socket) {
    socket.on("newGame", Game.prototype._onNewGame.bind(this));
    socket.on("input", this._onInput.bind(this));

    //TODO: Assign better unique/unguessable ids
    socket.emit("assignId", { playerId: (new Date()).getTime() });
  }

  Game.prototype._onNewGame = function(data) {
    this._createCycle(data.playerId);
  }

  Game.prototype._onInput = function(data) {
    if ([Cycle.DIRECTION.NORTH, Cycle.DIRECTION.EAST,
         Cycle.DIRECTION.SOUTH, Cycle.DIRECTION.WEST].indexOf(data.direction) != -1) {
      for (var i = 0; i < this.cycles.length; i++) {
        if (this.cycles[i].playerId == data.playerId) {
          this.cycles[i].turn(data.direction);
        }
      }
    }
  }

  return Game;
})();
