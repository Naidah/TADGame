export class Entity {
    constructor(x, y, r) {
        this._x = x;
        this._y = y;
        this._r = r;
        this._direction = 0;

        this._sx = 0;
        this._sy = 0;
    }

    update(delta) {
        this._x += this._sx * delta;
        this._y += this._sy * delta;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get r() {
        return this._r;
    }

    getRepr() {
        return {
            x: this._x,
            y: this._y,
            direction: this._direction
        }
    }
}