import { Character } from "./character"
import { Wall } from "./wall";
import { type_input, type_input_set, type_player, type_projectile, type_state, type_wall } from "./types";
import { Projectile } from "./projectiles/projectile";
import * as hitboxes from "./hitboxes/index";
import { MapGame } from "./map_tools/map";
import { MapLoader } from "./map_tools/map_loader";

class Game {
    private _players: { [id: number]: Character };
    private _walls: Wall[];
    private _projectiles: Projectile[];
    private _map: MapGame;
    private _map_loader: MapLoader;

    // temp, should be moved to map once created
    static readonly width = 800;
    static readonly height = 600;

    constructor() {
        this._players = {};
        this._walls = [];
        this._projectiles = [];

        this._map_loader = new MapLoader();
        this._map = this._map_loader.createMap();
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

    destroyProjectile(proj: Projectile): void {
        const i = this._projectiles.indexOf(proj);
        this._projectiles.splice(i, 1);
    }

    update(delta: number, inputs: type_input_set): void {
        for (const [key, p] of Object.entries(inputs)) {
            this._players[p.id].update(delta, p.input);
        }

        for (const p of [...this._projectiles]) { // make a copy of the list to allow removing from the original
            p.update(delta);
        }
    }

    isCollidingWalls(hitbox: hitboxes.Hitbox, dx = 0, dy = 0) {
        for (const wall of this._map.walls) {
            if (wall.hitbox(hitbox, dx, dy)) {
                return true;
            }
        }
        return false;
    }

    getRepr(): type_state {
        let prepr: { [id: number]: type_player } = {};
        for (const p of this.players) {
            prepr[p.id] = p.getRepr();
        }

        const wrepr: type_wall[] = [];
        for (const w of this._map.walls) {
            wrepr.push(w.getRepr());
        }

        const brepr: type_projectile[] = [];
        for (const p of this._projectiles) {
            brepr.push(p.getRepr());
        }

        const repr: type_state = {
            "players": prepr,
            "walls": wrepr,
            "projectiles": brepr,
        }
        return repr;
    }

    get width() {
        return this._map.width;
    }

    get height() {
        return this._map.height;
    }

    get players(): Character[] {
        return Object.values(this._players);
    }

    get alivePlayers(): Character[] {
        return this.players.filter(x => x.isAlive);
    }
}

let game = null;
export function getGame(): Game {
    if (game == null) {
        game = new Game();
    }
    return game;
}
