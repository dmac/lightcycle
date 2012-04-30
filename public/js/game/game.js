window.Tron.Game = (function() {
  var FPS = 30;

  var KEY_LEFT = 37;
  var KEY_UP = 38;
  var KEY_RIGHT = 39;
  var KEY_DOWN = 40;

  var Game = function() {
    this.socket = io.connect("/");
    this.canvas = document.getElementById("gameCanvas")
    this.cycles = [];
    document.addEventListener("keydown", this._onKeydown.bind(this));
    this.socket.on("assignId", this._onAssignId.bind(this));
    this.socket.on("update", this._onUpdate.bind(this));
  };

  Game.prototype._draw = function() {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (var i = 0; i < this.cycles.length; i++) {
      this.cycles[i].draw();
    }
  }

  Game.prototype._onAssignId = function(data) {
    this.playerId = data.playerId;
    this.socket.emit("newGame", { playerId: this.playerId });
  }

  Game.prototype._onUpdate = function(data) {
    this.cycles = this._resolveCycleData(data.cycles);
    this._draw();
  }

  Game.prototype._resolveCycleData = function(cycleData) {
    var cycles = [], cycle, path;

    for(var i = 0; i < cycleData.length; i++) {
      cycle = new Tron.Cycle(this.canvas);
      cycle.x = cycleData[i].x;
      cycle.y = cycleData[i].y;
      cycle.direction = cycleData[i].direction;
      cycle.color = cycleData[i].color;

      path = new Tron.Path(cycle);
      path.endpoint = cycleData[i].path.endpoint;
      path.turns = cycleData[i].path.turns;
      cycle.path = path;

      cycles.push(cycle);
    }

    return cycles;
  }

  Game.prototype._onKeydown = function(e) {
    //console.log("keydown: " + e.which);
    switch(e.which) {
      case KEY_UP:
        e.preventDefault();
        this.socket.emit("input", {
          playerId: this.playerId,
          direction: Tron.Cycle.DIRECTION.NORTH
        });
        break;
      case KEY_RIGHT:
        e.preventDefault();
        this.socket.emit("input", {
          playerId: this.playerId,
          direction: Tron.Cycle.DIRECTION.EAST
        });
        break;
      case KEY_DOWN:
        e.preventDefault();
        this.socket.emit("input", {
          playerId: this.playerId,
          direction: Tron.Cycle.DIRECTION.SOUTH
        });
        break;
      case KEY_LEFT:
        e.preventDefault();
        this.socket.emit("input", {
          playerId: this.playerId,
          direction: Tron.Cycle.DIRECTION.WEST
        });
        break;
    }
  }

  return Game;
})();
