import * as hitboxes from "./hitboxes/index";
import { type_wall } from "./types";

export class Wall {
    protected _x: number;
    protected _y: number;
    protected _w: number;
    protected _h: number;
    protected _hitbox: hitboxes.RectHitbox;

    constructor(x: number, y: number, w: number, h: number) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._hitbox = new hitboxes.RectHitbox(x, y, w, h);
    }

    hitbox(hitbox: hitboxes.Hitbox, dx: number, dy: number): boolean {
        return this._hitbox.testMovement(hitbox, dx, dy);
    }

    getRepr(): type_wall {
        return {
            x: this._x,
            y: this._y,
            w: this._w,
            h: this._h,
        }
    }
}
