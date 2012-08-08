module.exports = (function() {
  var Cycle = require("./cycle")
  var Player = require("./player")

  var FPS = 30;

  var Game = function(io) {
    this.io = io;
    this.players = [];
    this.io.sockets.on("connection", this._onConnection.bind(this));
    this.grid = { width: 900, height: 500 };
    this._run();
  };

  Game.prototype.serialize = function() {
    var cycles = [];
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].cycle !== null) {
        cycles.push(this.players[i].cycle.serialize());
      }
    }
    var state = {
      cycles: cycles,
      players: this.players.map(function(player) { return player.serialize(); })
    }

    return state;
  }

  Game.prototype._run = function() {
    setInterval(function() { this._loop(); }.bind(this), 1000/FPS);
  };

  Game.prototype._loop = function() {
    this.grid.paths = [];
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].cycle !== null) {
        this.grid.paths.push(this.players[i].cycle.path);
      }
    }

    for (i = 0; i < this.players.length; i++) {
      if (this.players[i].cycle !== null) {
        this.players[i].cycle.tick();
      }
    }

    this.io.sockets.emit("update", this.serialize());
  };

  Game.prototype._createCycle = function(playerId) {
    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].playerId === playerId) {
        this.players[i].cycle = new Cycle(this.players[i], this.grid);
      }
    }
  }

  Game.prototype._onConnection = function(socket) {
    socket.on("newGame", Game.prototype._onNewGame.bind(this));
    socket.on("input", this._onInput.bind(this));

    //TODO: Assign better unique/unguessable ids
    var playerId = (new Date()).getTime();
    this.players.push(new Player(playerId));

    socket.on("disconnect", function() {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].playerId === playerId) {
          this.players.splice(i, 1);
        }
      }
    }.bind(this));

    socket.emit("assignId", { playerId: playerId });
  }

  Game.prototype._onNewGame = function(data) {
    this._createCycle(data.playerId);
  }

  Game.prototype._onInput = function(data) {
    if ([Cycle.DIRECTION.NORTH, Cycle.DIRECTION.EAST,
         Cycle.DIRECTION.SOUTH, Cycle.DIRECTION.WEST].indexOf(data.direction) != -1) {
      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].playerId === data.playerId) {
          this.players[i].cycle.turn(data.direction);
        }
      }
    }
  }

  return Game;
})();
