export class Wall {
    constructor(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
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