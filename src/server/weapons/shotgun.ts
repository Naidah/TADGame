import { Weapon, WeaponState } from './weapon';
import { Projectile } from '../projectiles/projectile';
import { DecayingProjectile } from '../projectiles/decayingProjectile';
import { clamp, randRange } from '../utility';

const maxAmmo = 4;
const cooldownTime = 1.2;
const reloadTime = 2.5;
const shots = 6;
const spread = Math.PI / 10;

const projDecay = 0.45;
const projLifetime = 2;

export class Shotgun extends Weapon {
    constructor() {
        super();
        this._state = new ShotgunStateStandby(maxAmmo);
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

class ShotgunStateStandby extends WeaponState {
    private _ammo: number;
    private _spread: number = spread;
    constructor(ammo: number) {
        super();
        this._ammo = ammo;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): [WeaponState, Projectile[]] {
        const res: [WeaponState, Projectile[]] = [this as WeaponState, []];
        if (mdown) {
            if (this._ammo > 0) {
                for (let i = 0; i < shots; i++) {
                    res[1].push(new DecayingProjectile(x, y, direction + randRange(-this._spread, this._spread), projDecay, projLifetime));
                }
                this._ammo--;
                res[0] = new ShotgunStateCooldown(this._ammo);
                return res;
            } 
            res[0] = this.reload();
            return res;
            
        }
        return res;
    }

    reload(): WeaponState {
        return new ShotgunStateReload();
    }

    update(delta: number): WeaponState {
        return this;
    }
}

class ShotgunStateReload extends WeaponState {
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
            return new ShotgunStateStandby(maxAmmo);
        }
        return this;
    }
}

class ShotgunStateCooldown extends WeaponState {
    private _cooldownTime: number;
    private _ammo: number;
    constructor(ammo: number) {
        super();
        this._ammo = ammo;
        this._cooldownTime = cooldownTime;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean) {
        const res: [this, Projectile[]] = [this, []];
        return res;
    }

    reload(): WeaponState {
        return new ShotgunStateReload();
    }

    update(delta): WeaponState {
        this._cooldownTime -= delta;
        if (this._cooldownTime <= 0) {
            return new ShotgunStateStandby(this._ammo);
        }
        return this;
    }
}
