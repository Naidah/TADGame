import { Projectile } from "./projectile";
import { Character } from "../character";

export class ProjectileFactory {
    protected _speed: any;
    protected _owner: Character;
    protected _dmg: number;
    constructor(speed: number, dmg: number) {
        this._speed = speed;
        this._dmg = dmg;
    }

    generate(x, y, direction): Projectile {
        return new Projectile(this._owner, x, y, direction, this._speed, this._dmg);
    }

    set owner(o: Character) {
        this._owner = o;
    }
}