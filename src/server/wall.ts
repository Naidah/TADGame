import * as hitboxes from "./hitboxes/index";
import { type_wall } from "./types";

export class Wall {
    protected _x: any;
    protected _y: any;
    protected _w: any;
    protected _h: any;
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
