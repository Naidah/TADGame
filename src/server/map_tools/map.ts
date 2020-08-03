import { Wall } from "../wall";

export class MapGame {
    private _walls: Wall[];
    private _width: number;
    private _height: number;
    constructor(width: number, height: number) {
        this._walls = [];

        this._width = width;
        this._height = height;
    }

    addWall(wall: Wall) {
        this._walls.push(wall);
    }

    get walls(): Wall[] {
        return this._walls;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }
}