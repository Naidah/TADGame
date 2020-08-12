import { clamp } from './utility';
import { type_input, type_player } from './types'
import { Entity } from './entity';
import { getGame } from './game'
import * as weapons from './weapons/index';
import { Hitbox } from './hitboxes/index';

export class Character extends Entity {
    private static readonly maxHp: number = 100;
    private static readonly max_speed: number = 300;
    private static readonly accel_rate: number = 800;
    private static cid: number = 0;
    private static readonly respawnTime: number = 4;

    private _id: number;
    private _weapon: weapons.Weapon;
    private _hp: number = Character.maxHp;
    private _isAlive: boolean = true;
    private _respawnTimer: number = 0;

    constructor() {
        super(300, 300, 20);
        this._weapon = new weapons.Flamethrower(this);
        this._id = Character.cid++;
    }

    update(delta: number, input?: type_input): void {
        if (!this.isAlive) {
            this._respawnTimer -= delta;
            if (this._respawnTimer <= 0) {
                this.respawn();
            }
            return;
        }

        let l = input.left ? 1 : 0;
        let r = input.right ? 1 : 0;
        let u = input.up ? 1 : 0;
        let d = input.down ? 1 : 0;
        const mx = r - l;
        const my = d - u;

        if (mx != 0) {
            this._sx += mx * Character.accel_rate * delta;
        } else {
            this._sx = clamp(Math.sign(this._sx) * -Character.accel_rate * delta + this._sx, 0, this._sx);
        }

        if (my != 0) {
            this._sy += my * Character.accel_rate * delta;
        } else {
            this._sy = clamp(Math.sign(this._sy) * -Character.accel_rate * delta + this._sy, 0, this._sy);
        }

        let speed = Math.sqrt(Math.pow(this._sx, 2) + Math.pow(this._sy, 2));
        if (speed > Character.max_speed) {
            this._sx *= Character.max_speed / speed;
            this._sy *= Character.max_speed / speed;
        }

        const g = getGame();
        let movex = Math.round(this._sx * delta);
        let movey = Math.round(this._sy * delta);

        this.updatePos(movex, movey);

        this._direction = Math.atan2(input.my - this._y, input.mx - this._x);

        this._weapon.update(delta);

        let ps = this._weapon.shoot(this._x, this._y, this._direction, input.mdown, input.mpress);
        for (let p of ps) {
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

    damage(dmg): boolean {
        this._hp -= dmg;
        if (this._hp <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }

    respawn(): void {
        this._isAlive = true;
        this._weapon.reset();
        this._hp = Character.maxHp;
    }

    get id(): number {
        return this._id;
    }

    get hitbox(): Hitbox {
        return this._hitbox;
    }

    get isAlive(): boolean {
        return this._isAlive;
    }

    getRepr(): type_player {
        let repr = super.getRepr() as type_player;
        repr["id"] = this._id;
        return repr;
    }

    destroy(): void {
        let g = getGame();
        // g.removePlayer(this._id);
        this._isAlive = false;
        this._respawnTimer = Character.respawnTime;
    }
}