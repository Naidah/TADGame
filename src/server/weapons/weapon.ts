// ammo, max ammo, spread, firerate, reload time, projectile speed/life?

import { Projectile } from "../projectiles/projectile";
import { clamp, randBinom } from "../utility";
import { type_weapon_args } from "../types";
import { ProjectileFactory } from "../projectiles/projectileFactory";
import { Character } from "../character";

export abstract class WeaponState {
    protected _parent: Weapon;
    constructor(parent: Weapon) {
        this._parent = parent;
    }
    abstract shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): [WeaponState, Projectile[]];
    abstract reload(): WeaponState;
    abstract update(delta: number): WeaponState;
}

export class Weapon {
    protected _state: WeaponState;
    private _values: type_weapon_args;
    constructor(player: Character, {
        maxAmmo,
        cooldownTime,
        reloadTime,
        minSpread,
        maxSpread,
        spreadRecovery,
        spreadGrowth,
        projFactory = new ProjectileFactory(420, 40),
        isPress = false,
        shots = 1
    }) {
        this._values = {
            maxAmmo: maxAmmo,
            cooldownTime: cooldownTime,
            reloadTime: reloadTime,
            minSpread: minSpread,
            maxSpread: maxSpread,
            spreadRecovery: spreadRecovery,
            spreadGrowth: spreadGrowth,
            projFactory: projFactory,
            isPress: isPress,
            shots: shots
        };
        this._state = new StateStandby(this, this.maxAmmo, this.minSpread);
        this._values.projFactory.owner = player;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): Projectile[] {
        let res = this._state.shoot(x, y, direction, mdown, mpress);
        this._state = res[0];
        return res[1];
    }

    reload() {
        this._state = this._state.reload();
    }

    update(delta: number) {
        this._state = this._state.update(delta);
    }

    reset() {
        this._state = new StateStandby(this, this.maxAmmo, this.minSpread);
    }

    get maxAmmo() {
        return this._values.maxAmmo;
    }

    get cooldownTime() {
        return this._values.cooldownTime;
    }

    get reloadTime() {
        return this._values.reloadTime;
    }

    get minSpread() {
        return this._values.minSpread;
    }

    get maxSpread() {
        return this._values.maxSpread;
    }

    get spreadRecovery() {
        if (this._values.spreadRecovery == 0) {
            return 0;
        }
        return (this.maxSpread - this.minSpread) / this._values.spreadRecovery;
    }

    get spreadGrowth() {
        if (this._values.spreadGrowth == 0) {
            return 0;
        }
        return (this.maxSpread - this.minSpread) / this._values.spreadGrowth;
    }

    get projFactory() {
        return this._values.projFactory;
    }

    get isPress() {
        return this._values.isPress;
    }

    get shots() {
        return this._values.shots;
    }
}

class StateStandby extends WeaponState {
    private _ammo: number;
    private _spread: number;
    constructor(parent: Weapon, ammo: number, spread: number) {
        super(parent);
        this._ammo = ammo;
        this._spread = spread;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): [WeaponState, Projectile[]] {
        let res: [WeaponState, Projectile[]] = [this as WeaponState, []];
        if (this._parent.isPress ? mpress : mdown) {
            if (this._ammo > 0) {
                for (let i = 0; i < this._parent.shots; i++) {
                    let randDirection = direction + randBinom(-this._spread, this._spread)
                    res[1].push(this._parent.projFactory.generate(x, y, randDirection));
                }
                this._spread = clamp(this._spread + this._parent.spreadGrowth, this._parent.minSpread, this._parent.maxSpread);
                this._ammo--;
                if (this._parent.cooldownTime != 0) {
                    res[0] = new StateCooldown(this._parent, this._ammo, this._spread);
                    return res;
                }
            } else {
                res[0] = this.reload();
                return res;
            }
        }
        return res;
    }

    reload(): WeaponState {
        return new StateReload(this._parent);
    }

    update(delta: number): WeaponState {
        this._spread = clamp(this._spread - this._parent.spreadRecovery * delta, this._parent.minSpread, this._parent.maxSpread);
        return this;
    }
}

class StateReload extends WeaponState {
    private _reloadTime: number;
    constructor(parent: Weapon) {
        super(parent);
        this._reloadTime = this._parent.reloadTime;
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
            return new StateStandby(this._parent, this._parent.maxAmmo, this._parent.minSpread);
        }
        return this;
    }
}

class StateCooldown extends WeaponState {
    private _cooldownTime: number;
    private _ammo: number;
    private _spread: number;
    constructor(parent: Weapon, ammo: number, spread: number) {
        super(parent);
        this._ammo = ammo;
        this._spread = spread;
        this._cooldownTime = this._parent.cooldownTime;
    }

    shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean) {
        let res: [this, Projectile[]] = [this, []];
        return res;
    }

    reload(): WeaponState {
        return new StateReload(this._parent);
    }

    update(delta): WeaponState {
        this._cooldownTime -= delta;
        if (this._cooldownTime <= 0) {
            return new StateStandby(this._parent, this._ammo, this._spread);
        }
        return this;
    }
}