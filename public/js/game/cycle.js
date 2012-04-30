window.Tron.Cycle = (function() {

  var Cycle = function(canvas) {
    this.canvas = canvas;
    this.color = "#000000";
    this.x = 450;
    this.y = 400;
    this.direction = Cycle.DIRECTION.NORTH;
    this.velocity = 5;
    this.width = 5;
    this.height = 5;
    this.path = new Tron.Path(this);
  };

  Cycle.DIRECTION = { NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 };

  Cycle.prototype.draw = function() {
    console.log(this.x, this.y, this.width, this.height);
    var context = this.canvas.getContext("2d");
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    this.path.draw(this.canvas);
  };

  return Cycle;
})();
