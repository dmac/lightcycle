module.exports = (function() {
  var Path = require("./path");

  var Cycle = function(player, grid) {
    this.player = player;
    this.grid = grid;
    this.x = Math.floor(Math.random() * this.grid.width);
    this.y = Math.floor(Math.random() * this.grid.height);
    this.direction = Math.floor(Math.random() * 4);
    this.velocity = 5;
    this.width = 5;
    this.height = 5;
    this.color = Math.floor(Math.random()*16777215).toString(16); // TODO(dmac): This might need padding 0s.
    this.path = new Path(this);
  };

  Cycle.DIRECTION = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

  Cycle.prototype.tick = function() {
    switch(this.direction) {
      case Cycle.DIRECTION.NORTH:
        this.y -= this.velocity;
        break;
      case Cycle.DIRECTION.EAST:
        this.x += this.velocity;
        break;
      case Cycle.DIRECTION.SOUTH:
        this.y += this.velocity;
        break;
      case Cycle.DIRECTION.WEST:
        this.x -= this.velocity;
        break;
    }

    this.path.tick();

    if (this._newPositionCollidesWithBoundary() || this._newPositionCollidesWithPath()) {
      this._die();
    }
  }

  Cycle.prototype.turn = function(direction) {
    if (this.direction != direction && this.direction != (direction + 2) % 4) {
      this.direction = direction;
      this.path.addTurn();
    }
  };

  Cycle.prototype.serialize = function() {
    return {
      playerId: this.player.playerId,
      x: this.x,
      y: this.y,
      direction: this.direction,
      color: this.color,
      path: this.path.serialize()
    }
  }

  Cycle.prototype._die = function() {
    this.x = Math.floor(Math.random() * this.grid.width);
    this.y = Math.floor(Math.random() * this.grid.height);
    this.direction = Math.floor(Math.random() * 4);
    this.path = new Path(this);
  };

  Cycle.prototype._newPositionCollidesWithPath = function() {
    for (var i = 0; i < this.grid.paths.length; i++) {
      var segments = this.grid.paths[i].pathSegments();
      for (var j = 0; j < segments.length; j++) {
        var segment = segments[j];

        // First section checks collision with vertical path, second checks collision with horizontal path.
        if ((this.x < segment.start[0] && this.x + this.width > segment.start[0] &&
            (this.y + this.height < segment.start[1] && this.y > segment.end[1] ||
             this.y > segment.start[1] && this.y + this.height < segment.end[1])) ||

            (this.y < segment.start[1] && this.y + this.height > segment.start[1] &&
             (this.x + this.width < segment.start[0] && this.x > segment.end[0] ||
              this.x > segment.start[0] && this.x + this.width < segment.end[0]))) {
          return true;
        }
      }
    }
    return false;
  };

  Cycle.prototype._newPositionCollidesWithBoundary = function() {
    return (this.x < 0 ||
            this.y < 0 ||
            this.x + this.width > this.grid.width ||
            this.y + this.height > this.grid.height);
  }

  return Cycle;
})();
