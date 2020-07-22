export class Entity {
  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._direction = 0;

    this._sx = 0;
    this._sy = 0;
  }

  update(delta) {
    this._x += this._sx * delta;
    this._y += this._sy * delta;
  }

  getRepr() {
    return {
      x: this._x,
      y: this._y,
      direction: this._direction,
    };
  }
}
