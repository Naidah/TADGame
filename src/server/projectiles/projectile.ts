import { Entity } from '../entity'
import { getGame } from '../game';

const radius = 5;

export class Projectile extends Entity {
    private _speed: number;
    constructor(x: number, y: number, direction: number, speed: number) {
        super(x, y, radius);
        this._direction = direction;

        this._speed = speed;
        this._sx = speed * Math.cos(direction);
        this._sy = speed * Math.sin(direction);
    }

    update(delta: number) {
        super.update(delta);
        let g = getGame();
        if (this._hitbox.isOutOfBounds() || g.isCollidingWalls(this._hitbox)) {
            this.destroy();
        }
    }

    destroy(): void {
        let g = getGame();
        g.destroyProjectile(this);
    }
}