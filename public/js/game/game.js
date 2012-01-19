window.Tron.Game = (function() {
  var FPS = 30;

  var KEY_LEFT = 37;
  var KEY_UP = 38;
  var KEY_RIGHT = 39;
  var KEY_DOWN = 40;

  var Game = function() {
    this.canvas = document.getElementById("gameCanvas")
    this.sprite = new Tron.Sprite(this.canvas);
    document.addEventListener("keydown", this._onKeydown.bind(this));
  };

  Game.prototype.run = function() {
    setInterval(function() { this._loop(); }.bind(this), 1000/FPS);
  };

  Game.prototype._loop = function() {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sprite.tick();
    this.sprite.draw();
  };

  Game.prototype._onKeydown = function(e) {
    console.log("keydown: " + e.which);
    switch(e.which) {
      case KEY_UP:
        e.preventDefault();
        this.sprite.direction = Tron.Sprite.DIRECTION.NORTH;
        break;
      case KEY_RIGHT:
        e.preventDefault();
        this.sprite.direction = Tron.Sprite.DIRECTION.EAST;
        break;
      case KEY_DOWN:
        e.preventDefault();
        this.sprite.direction = Tron.Sprite.DIRECTION.SOUTH;
        break;
      case KEY_LEFT:
        e.preventDefault();
        this.sprite.direction = Tron.Sprite.DIRECTION.WEST;
        break;
    }
  }

  return Game;
})();
