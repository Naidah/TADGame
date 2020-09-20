import { MapGame } from "./map";
import { Wall } from "../wall";
import { readJSON } from '../utility'
import { type_map } from "../types";

export class MapLoader {
    private _map: string;
    constructor() {
        this._map = "basic.json";
    }

    createMap(): MapGame {
        const mapData = readJSON('maps/' + this._map) as type_map;
        const map = new MapGame(mapData.settings.size.width, mapData.settings.size.height);
        for (const w of mapData.walls) {
            map.addWall(new Wall(w.x, w.y, w.w, w.h));
        }
        return map;
    }
}
