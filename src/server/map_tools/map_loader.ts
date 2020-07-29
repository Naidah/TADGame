import { MapGame } from "./map";
import { readJSON } from '../utility'
import { type_map } from "../types";
import { Wall } from "../wall";

export class MapLoader {
    private _map: string;
    constructor() {
        this._map = "test.json";
    }

    createMap(): MapGame {
        let mapData = readJSON('maps/' + this._map) as type_map;
        let map = new MapGame(mapData.settings.size.width, mapData.settings.size.height);
        for (let w of mapData.walls) {
            map.addWall(new Wall(w.x, w.y, w.w, w.h));
        }
        return map;
    }
}