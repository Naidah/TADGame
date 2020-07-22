import { Character } from "./character"

class Game {
    constructor() {
        this._players = {};
        this._walls = [];
        this._projectiles = [];
    }

    addPlayer() {
        const c = new Character();
        this._players[c.id] = c;
        return c.id;
    }

    removePlayer(id) {
        delete this._players[id];
    }

    spawnProjectile(proj) {
        this._projectiles.push(proj);
    }

    update(delta, inputs) {
        for (const [key, p] of Object.entries(inputs)) {
            this._players[p.id].update(delta, p.input);
        }

        for (let p of this._projectiles) {
            p.update(delta);
        }
    }

    getRepr() {
        let repr = {};

        let prepr = {};
        for (const [key, p] of Object.entries(this._players)) {
            prepr[p.id] = p.getRepr();
        }
        repr["players"] = prepr;

        let wrepr = [];
        for (let w of this._walls) {
            wrepr.push(w.getRepr());
        }
        repr["walls"] = wrepr;

        let brepr = [];
        for (let p of this._projectiles) {
            brepr.push(p.getRepr());
        }
        repr["projectiles"] = brepr;

        return repr;
    }
}

let game = null;
export function getGame() {
    if (game == null) {
        game = new Game();
    }
    return game;
}