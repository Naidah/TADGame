import { Character } from "./character"
import { Wall } from "./wall";
import { type_input, type_input_set, type_state, type_player, type_wall, type_projectile } from "./types";
import { Projectile } from "./projectile";

class Game {
    private _players: { [id: number]: Character };
    private _walls: Wall[];
    private _projectiles: Projectile[];
    constructor() {
        this._players = {};
        this._walls = [new Wall(400, 400, 50, 50)];
        this._projectiles = [];
    }

    addPlayer(): number {
        const c = new Character();
        this._players[c.id] = c;
        return c.id;
    }

    removePlayer(id: number): void {
        delete this._players[id];
    }

    spawnProjectile(proj: Projectile): void {
        this._projectiles.push(proj);
    }

    update(delta: number, inputs: type_input_set): void {
        for (const [key, p] of Object.entries(inputs)) {
            this._players[p.id].update(delta, p.input);
        }

        for (let p of this._projectiles) {
            p.update(delta);
        }
    }

    collision(x: number, y: number, r: number) {
        for (let i of this._walls) {
            if (i.hitbox(x, y, r)) {
                return true;
            }
        }
        return false;
    }

    getRepr(): type_state {
        let prepr: { [id: number]: type_player } = {};
        for (const [key, p] of Object.entries(this._players)) {
            prepr[p.id] = p.getRepr();
        }

        let wrepr: type_wall[] = [];
        for (let w of this._walls) {
            wrepr.push(w.getRepr());
        }

        let brepr: type_projectile[] = [];
        for (let p of this._projectiles) {
            brepr.push(p.getRepr());
        }

        let repr: type_state = {
            "players": prepr,
            "walls": wrepr,
            "projectiles": brepr
        }
        return repr;
    }
}

let game = null;
export function getGame(): Game {
    if (game == null) {
        game = new Game();
    }
    return game;
}