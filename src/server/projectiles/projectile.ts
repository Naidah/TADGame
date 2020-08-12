import { Entity } from '../entity'
import { getGame } from '../game';
import { Character } from '../character';

const radius = 5;

export class Projectile extends Entity {
    private _speed: number;
    private _owner: Character;
    private _dmg: number;
    constructor(owner: Character, x: number, y: number, direction: number, speed: number, dmg: number) {
        super(x, y, radius);
        this._direction = direction;
        this._owner = owner;
        this._dmg = dmg;

        this._speed = speed;
        this._sx = speed * Math.cos(direction);
        this._sy = speed * Math.sin(direction);
    }

    update(delta: number) {
        super.update(delta);
        let g = getGame();
        let hasHit = false;
        for (let player of g.players) {
            if (player.hitbox.hasCollision(this._hitbox) && player != this._owner) {
                player.damage(this._dmg);
                hasHit = true;
            }
        }
        if (this._hitbox.isOutOfBounds() || g.isCollidingWalls(this._hitbox) || hasHit) {
            this.destroy();
        }
    }

    destroy(): void {
        let g = getGame();
        g.destroyProjectile(this);
    }
}