import { DecayingProjectile } from "./decayingProjectile";
import { Projectile } from "./projectile";
import { ProjectileFactory } from "./projectileFactory";

export class DecayingProjectileFactory extends ProjectileFactory {
    private _rate: number;
    private _lifetime: number;
    constructor(speed: number, dmg: number, rate: number, lifetime: number) {
        super(speed, dmg);
        this._rate = rate;
        this._lifetime = lifetime;
    }

    generate(x: number, y: number, direction: number): Projectile {
        return new DecayingProjectile(
            this._owner,
            x,
            y,
            direction,
            this._speed,
            this._dmg,
            this._rate,
            this._lifetime
        );
    }
}
