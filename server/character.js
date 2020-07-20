import { clamp } from './utility.js';

const max_speed = 10;
const accel_rate = 2;
let cid = 0;
export class Character {
    constructor() {
        this._x = 300;
        this._y = 300;
        this._id = cid++;

        this._sx = 0;
        this._sy = 0;
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
            this._sx *= max_speed/speed;
            this._sy *= max_speed/speed;
        }

        this._x += this._sx * delta;
        this._y += this._sy * delta;
    }

    get id() {
        return this._id;
    }

    getRepr() {
        return {
            id: this._id,
            x: this._x,
            y: this._y
        }
    }
}

// export default Character;