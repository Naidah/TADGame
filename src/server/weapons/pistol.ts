import { Weapon, WeaponState } from './weapon';
import { Projectile } from '../projectile';
import { clamp, randBinom } from '../utility';

const maxAmmo = 6;
const reloadTime = 3;
const minSpread = 0;
const maxSpread = Math.PI / 8;
const spreadRecovery = maxSpread * 0.3;
const spreadGrowth = maxSpread * (1 / 3);

export class Pistol extends Weapon {
    constructor() {
        super();
        this._state = new PistolStateStandby();
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): Projectile[] {
        let res = this._state.shoot(x, y, direction, mdown, mpress);
        this._state = res[0];
        return res[1];
    }

    reload() {
        this._state = this._state.reload();
    }
}

class PistolStateStandby extends WeaponState {
    private _ammo: number;
    private _spread: number = minSpread;
    constructor() {
        super();
        this._ammo = maxAmmo;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): [WeaponState, Projectile[]] {
        let res: [WeaponState, Projectile[]] = [this as WeaponState, []];
        if (mpress) {
            if (this._ammo > 0) {
                res[1].push(new Projectile(x, y, direction + randBinom(-this._spread, this._spread)));
                this._spread = clamp(this._spread + spreadGrowth, minSpread, maxSpread);
                this._ammo--;
            } else {
                res[0] = this.reload();
                return res;
            }
        }
        return res;
    }

    reload(): WeaponState {
        return new PistolStateReload();
    }

    update(delta: number): WeaponState {
        this._spread = clamp(this._spread - spreadRecovery * delta, minSpread, maxSpread);
        return this;
    }
}

class PistolStateReload extends WeaponState {
    private _reloadTime: number;
    constructor() {
        super();
        this._reloadTime = reloadTime;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean) {
        let res: [this, Projectile[]] = [this, []];
        return res;
    }

    reload(): WeaponState {
        return this;
    }

    update(delta): WeaponState {
        this._reloadTime -= delta;
        if (this._reloadTime <= 0) {
            return new PistolStateStandby();
        }
        return this;
    }
}