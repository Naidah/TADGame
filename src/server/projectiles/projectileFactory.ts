import { Projectile } from "./projectile";
import { Character } from "../character";

export class ProjectileFactory {
    protected _speed: any;
    private _owner: Character;
    constructor(speed: number) {
        this._speed = speed;
    }

    generate(x, y, direction): Projectile {
        return new Projectile(x, y, direction, this._speed);
    }

    set owner(o: Character) {
        this._owner = o;
    }
}