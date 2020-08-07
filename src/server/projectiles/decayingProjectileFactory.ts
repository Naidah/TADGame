import { Projectile } from "./projectile";
import { ProjectileFactory } from "./projectileFactory";
import { DecayingProjectile } from "./decayingProjectile";

export class DecayingProjectileFactory extends ProjectileFactory {
    private _rate: number;
    private _lifetime: number;
    constructor(speed: number, rate: number, lifetime: number) {
        super(speed);
        this._rate = rate;
        this._lifetime = lifetime;
    }

    generate(x: number, y: number, direction: number): Projectile {
        return new DecayingProjectile(x, y, direction, this._speed, this._rate, this._lifetime);
    }
}