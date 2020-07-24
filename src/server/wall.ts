import { type_wall } from "./types";

export class Wall {
    protected _x: any;
    protected _y: any;
    protected _w: any;
    protected _h: any;

    constructor(x: number, y: number, w: number, h: number) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
    }

    hitbox(x: number, y: number, r: number): boolean {
        if (x >= this._x - r && x <= this._x + this._w + r) {
            if (y >= this._y - r && y <= this._y + this._h + r) {
                return true
            }
        }
        return false;
    }

    getRepr(): type_wall {
        return {
            x: this._x,
            y: this._y,
            w: this._w,
            h: this._h
        }
    }
}