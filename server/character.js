import { clamp } from './utility.js';
import { Entity } from './entity.js';
import { Projectile } from './projectile.js';
import { getGame } from './game.js'

const max_speed = 300; // pixels/s
const accel_rate = 800; // pixels/s^2
let cid = 0;
export class Character extends Entity {
    constructor() {
        super(300, 300);
        this._id = cid++;
    }

    update(delta, input) {
        const mx = input.right - input.left;
        const my = input.down - input.up;

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

        super.update(delta);

        if (input.mpress) {
            const g = getGame();
            g.spawnProjectile(new Projectile(this._x, this._y, this._direction));
        }
    }

    get id() {
        return this._id;
    }

    getRepr() {
        let repr = super.getRepr();
        repr["id"] = this._id;
        return repr;
    }
}

// export default Character;