import { Character } from '../character';
import { Projectile } from './projectile';

export class DecayingProjectile extends Projectile {
    private _lifetime: number;
    private _rate: number;
    constructor(
        owner: Character,
        x: number,
        y: number,
        direction: number,
        speed: number,
        dmg: number,
        rate: number,
        lifetime: number
    ) {
        super(owner, x, y, direction, speed, dmg);
        this._rate = rate;
        this._lifetime = lifetime;
    }
    update(delta: number): void {
        super.update(delta);

        // reduce speed
        const decayAmt = Math.pow(this._rate, delta);
        this._sx *= decayAmt;
        this._sy *= decayAmt;

        // decrease lifetime
        this._lifetime -= delta;
        if (this._lifetime <= 0) {
            this.destroy();
        }
    }
}
