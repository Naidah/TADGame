import { Entity } from './entity.js'

const speed = 420;

export class Projectile extends Entity {
    constructor(x, y, direction) {
        super(x, y);
        this._direction = direction;

        this._sx = speed * Math.cos(direction);
        this._sy = speed * Math.sin(direction);
    }
}