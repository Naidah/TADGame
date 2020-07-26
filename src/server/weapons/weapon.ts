// ammo, max ammo, spread, firerate, reload time, projectile speed/life?

import { Projectile } from "../projectiles/projectile";

export abstract class Weapon {
    protected _state: WeaponState;
    constructor() { }

    abstract shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): Projectile[];
    update(delta: number) {
        this._state = this._state.update(delta);
    }
}

export abstract class WeaponState {
    constructor() { }
    abstract shoot(x: number, y: number, direction: number, mdown: boolean, mpress: boolean): [WeaponState, Projectile[]];
    abstract reload(): WeaponState;
    abstract update(delta: number): WeaponState;
}