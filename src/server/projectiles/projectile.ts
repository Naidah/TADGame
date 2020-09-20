import { Entity } from '../entity'
import { getGame } from '../game';

const speed = 420;
const radius = 5;

export class Projectile extends Entity {
    constructor(x: number, y: number, direction: number) {
        super(x, y, radius);
        this._direction = direction;

        this._sx = speed * Math.cos(direction);
        this._sy = speed * Math.sin(direction);
    }

    update(delta: number) {
        super.update(delta);
        const g = getGame();
        if (this._hitbox.isOutOfBounds() || g.isCollidingWalls(this._hitbox)) {
            this.destroy();
        }
    }

    destroy(): void {
        const g = getGame();
        g.destroyProjectile(this);
    }
}
