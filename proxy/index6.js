class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }
  console.log(Point.prototype.constructor  );
  console.log(Point );
  console.log(Point.prototype.constructor === Point );

