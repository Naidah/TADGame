import { clamp } from './utility';
import { type_input, type_player } from './types'
import { Entity } from './entity';
import { getGame } from './game'
import * as weapons from './weapons/index';

const max_speed = 300; // pixels/s
const accel_rate = 800; // pixels/s^2
let cid = 0;
export class Character extends Entity {
    private _id: number;
    private _weapon: weapons.Weapon;
    constructor() {
        super(300, 300, 20);
        this._weapon = new weapons.Shotgun();
        this._id = cid++;
    }

    update(delta: number, input?: type_input): void {
        const l = input.left ? 1 : 0;
        const r = input.right ? 1 : 0;
        const u = input.up ? 1 : 0;
        const d = input.down ? 1 : 0;
        const mx = r - l;
        const my = d - u;

        if (mx != 0) {
            this._sx += mx * accel_rate * delta;
        } else {
            this._sx = clamp(Math.sign(this._sx) * -accel_rate * delta + this._sx, 0, this._sx);
        }

        if (my != 0) {
            this._sy += my * accel_rate * delta;
        } else {
            this._sy = clamp(Math.sign(this._sy) * -accel_rate * delta + this._sy, 0, this._sy);
        }

        const speed = Math.sqrt(Math.pow(this._sx, 2) + Math.pow(this._sy, 2));
        if (speed > max_speed) {
            this._sx *= max_speed / speed;
            this._sy *= max_speed / speed;
        }

        const g = getGame();
        const movex = Math.round(this._sx * delta);
        const movey = Math.round(this._sy * delta);

        this.updatePos(movex, movey);

        this._direction = Math.atan2(input.my - this._y, input.mx - this._x);

        this._weapon.update(delta);

        const ps = this._weapon.shoot(this._x, this._y, this._direction, input.mdown, input.mpress);
        for (const p of ps) {
            g.spawnProjectile(p);
        }
    }

    updatePos(dx: number, dy: number): void {
        const g = getGame();
        while ((g.isCollidingWalls(this._hitbox, dx, 0) || this._hitbox.isOutOfBounds(dx, 0, true)) && dx != 0) {
            this._sx = 0;
            dx -= Math.sign(dx);
        }
        this._x += dx;
        this._updateHitbox();

        while ((g.isCollidingWalls(this._hitbox, 0, dy) || this._hitbox.isOutOfBounds(0, dy, true)) && dy != 0) {
            this._sy = 0;
            dy -= Math.sign(dy);
        }
        this._y += dy;
        this._updateHitbox();
    }

    get id(): number {
        return this._id;
    }

    getRepr(): type_player {
        const repr = super.getRepr() as type_player;
        repr.id = this._id;
        return repr;
    }

    destroy(): void {
        const g = getGame();
        g.removePlayer(this._id);
    }
}

// export default Character;
