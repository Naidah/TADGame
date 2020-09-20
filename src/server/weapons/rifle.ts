import { Weapon, WeaponState } from './weapon';
import { Projectile } from '../projectiles/projectile';
import { clamp, randBinom } from '../utility';

const maxAmmo = 10;
const cooldownTime = 0.18;
const reloadTime = 1.5;
const minSpread = Math.PI / 30;
const maxSpread = Math.PI / 10;
const spreadRecovery = maxSpread / 0.6;
const spreadGrowth = maxSpread / 3;

export class Rifle extends Weapon {
    constructor() {
        super();
        this._state = new RifleStateStandby(maxAmmo, minSpread);
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): Projectile[] {
        const res = this._state.shoot(x, y, direction, mdown, mpress);
        this._state = res[0];
        return res[1];
    }

    reload() {
        this._state = this._state.reload();
    }
}

class RifleStateStandby extends WeaponState {
    private _ammo: number;
    private _spread: number;
    constructor(ammo: number, spread: number) {
        super();
        this._ammo = ammo;
        this._spread = spread;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): [WeaponState, Projectile[]] {
        const res: [WeaponState, Projectile[]] = [this as WeaponState, []];
        if (mdown) {
            if (this._ammo > 0) {
                res[1].push(new Projectile(x, y, direction + randBinom(-this._spread, this._spread)));
                this._spread = clamp(this._spread + spreadGrowth, minSpread, maxSpread);
                this._ammo--;
                res[0] = new RifleStateCooldown(this._ammo, this._spread);
                return res;
            } 
            res[0] = this.reload();
            return res;
            
        }
        return res;
    }

    reload(): WeaponState {
        return new RifleStateReload();
    }

    update(delta: number): WeaponState {
        this._spread = clamp(this._spread - spreadRecovery * delta, minSpread, maxSpread);
        return this;
    }
}

class RifleStateReload extends WeaponState {
    private _reloadTime: number;
    constructor() {
        super();
        this._reloadTime = reloadTime;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean) {
        const res: [this, Projectile[]] = [this, []];
        return res;
    }

    reload(): WeaponState {
        return this;
    }

    update(delta): WeaponState {
        this._reloadTime -= delta;
        if (this._reloadTime <= 0) {
            return new RifleStateStandby(maxAmmo, minSpread);
        }
        return this;
    }
}

class RifleStateCooldown extends WeaponState {
    private _cooldownTime: number;
    private _ammo: number;
    private _spread: number;
    constructor(ammo: number, spread: number) {
        super();
        this._ammo = ammo;
        this._spread = spread;
        this._cooldownTime = cooldownTime;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean) {
        const res: [this, Projectile[]] = [this, []];
        return res;
    }

    reload(): WeaponState {
        return new RifleStateReload();
    }

    update(delta): WeaponState {
        this._cooldownTime -= delta;
        if (this._cooldownTime <= 0) {
            return new RifleStateStandby(this._ammo, this._spread);
        }
        return this;
    }
}
