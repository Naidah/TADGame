import { Entity } from '../entity'

const speed = 420;
const radius = 5;

export class Projectile extends Entity {
    constructor(x: number, y: number, direction: number) {
        super(x, y, radius);
        this._direction = direction;

        this._sx = speed * Math.cos(direction);
        this._sy = speed * Math.sin(direction);
    }


    destroy(): void {
        this._x = 1000;
        this._y = 1000;
    }
}