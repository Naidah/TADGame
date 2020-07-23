export class Wall {
    constructor(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
    }

    hitbox(x, y, r) {
        if (x >= this._x - r && x <= this._x + this._w + r) {
            if (y >= this._y - r && y <= this._y + this._h + r) {
                return true
            }
        }
    }

    getRepr() {
        return {
            x: this._x,
            y: this._y,
            w: this._w,
            h: this._h
        }
    }
}