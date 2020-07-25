import { clamp } from './utility';
import { type_input, type_player } from './types'
import { Entity } from './entity';
import { Projectile } from './projectile';
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
        this._weapon = new weapons.Pistol();
        this._id = cid++;
    }

    update(delta: number, input?: type_input): void {
        let l = input.left ? 1 : 0;
        let r = input.right ? 1 : 0;
        let u = input.up ? 1 : 0;
        let d = input.down ? 1 : 0;
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

        let speed = Math.sqrt(Math.pow(this._sx, 2) + Math.pow(this._sy, 2));
        if (speed > max_speed) {
            this._sx *= max_speed / speed;
            this._sy *= max_speed / speed;
        }

        this._direction = Math.atan2(input.my - this._y, input.mx - this._x);

        const g = getGame();
        let movex = Math.round(this._sx * delta);
        let movey = Math.round(this._sy * delta);
        while (g.collision(this._x + movex, this._y, this._r) && movex != 0) {
            this._sx = 0;
            movex -= Math.sign(movex);
        }
        this._x += movex;

        while (g.collision(this._x, this._y + movey, this._r) && movey != 0) {
            this._sy = 0;
            movey -= Math.sign(movey);
        }
        this._y += movey;

        this._weapon.update(delta);

        let ps = this._weapon.shoot(this._x, this._y, this._direction, input.mdown, input.mpress);
        for (let p of ps) {
            g.spawnProjectile(p);
        }
    }

    get id(): number {
        return this._id;
    }

    getRepr(): type_player {
        let repr = super.getRepr() as type_player;
        repr["id"] = this._id;
        return repr;
    }
}

// export default Character;