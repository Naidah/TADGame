import { type_entity } from "./types";
import { Hitbox, CircleHitbox } from "./hitbox";

export class Entity {
  protected _x: any;
  protected _y: any;
  protected _r: any;
  protected _direction: number;

  protected _sx: number;
  protected _sy: number;

  protected _hitbox: Hitbox;

  constructor(x, y, r) {
    this._x = x;
    this._y = y;
    this._r = r;
    this._hitbox = new CircleHitbox(x, y, r);
    this._direction = 0;

    this._sx = 0;
    this._sy = 0;
  }

  update(delta: number): void {
    this._x += this._sx * delta;
    this._y += this._sy * delta;
    this._updateHitbox();
  }

  _updateHitbox () : void {
    this._hitbox.updatePos(this._x, this._y);
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get r(): number {
    return this._r;
  }

  getRepr(): type_entity {
    return {
      x: this._x,
      y: this._y,
      direction: this._direction
    }
  }
}