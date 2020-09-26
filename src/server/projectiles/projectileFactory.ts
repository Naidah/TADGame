import { Character } from "../character";
import { Projectile } from "./projectile";

export class ProjectileFactory {
    protected _speed: number;
    protected _owner: Character;
    protected _dmg: number;
    constructor(speed: number, dmg: number) {
        this._speed = speed;
        this._dmg = dmg;
    }

    generate(x: number, y: number, direction: number): Projectile {
        return new Projectile(this._owner, x, y, direction, this._speed, this._dmg);
    }

    set owner(o: Character) {
        this._owner = o;
    }
}
