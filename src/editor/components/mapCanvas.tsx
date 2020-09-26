import * as React from 'react';
import { Selector } from '../../components/selector'
import { type_map } from '../../server/types';

const tile_size = 50;

type Props = Record<string, unknown>

interface State {
    file: string,
    name: string,
    width: number,
    height: number;
    mwidth: number,
    mheight: number,
    state: number[][],
    maps: JSX.Element[]
}

export class MapCanvas extends React.Component<Props, State> {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _canvasRef: React.RefObject<HTMLCanvasElement>;
    constructor(props: Props) {
        super(props);
        const mw = Math.floor(800 / tile_size);
        const mh = Math.floor(600 / tile_size);

        this.state = {
            file: '',
            name: 'NewMap',
            width: 800, height: 600,
            mwidth: mw, mheight: mh,
            state: Array(mw).fill(null)
                .map(() => Array(mh).fill(0)),
            maps: [],
        };

        this._canvasRef = React.createRef();

        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleCanvasSubmit = this.handleCanvasSubmit.bind(this);
        this.updateName = this.updateName.bind(this);
        this.loadMap = this.loadMap.bind(this);
        this.saveMap = this.saveMap.bind(this);
    }

    componentDidMount(): void {
        this._ctx = this._canvas.getContext("2d");
        this.draw();
        this.loadMapList();
    }

    draw(): void {
        this._ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.state.state.forEach((vx, cx) => {
            vx.forEach((vy, cy) => {
                if (vy === 1) {
                    this._ctx.beginPath();
                    this._ctx.rect(cx * tile_size, cy * tile_size, tile_size, tile_size);
                    this._ctx.fill();
                }
            });
        });
    }

    updateName(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ name: event.target.value });
    }

    handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void {
        const rect = this._canvas.getBoundingClientRect();
        const cx = event.clientX - rect.left;
        const cy = event.clientY - rect.top;

        const mx = Math.floor(cx / tile_size);
        const my = Math.floor(cy / tile_size);

        const state = this.state.state.map((l) => l.slice());   

        if (state[mx][my] !== 1) {
            state[mx][my] = 1;
        } else {
            state[mx][my] = 0;
        }

        this.setState({state: state});

        this.draw();
    }

    handleCanvasSubmit(): void {
        const res: type_map = {
            settings: {
                name: this.state.name,
                size: {
                    width: this.state.width,
                    height: this.state.height,
                },
            },
            walls: [],
        };
        res.walls = getElementList(this.state.state);
        this.saveMap(res);
        this.loadMapList();
    }

    async loadMapList(): Promise<void> {
        await fetch("/index.json")
            .then((resp) => resp.json())
            .then((resp) => {
                const newMaps = [];
                for (const m in resp) {
                    newMaps.push(<option key={m} value={m}>{resp[m]}</option>);
                }
                this.setState({ maps: newMaps });
            });
    }

    loadMap(name: string): void {
        const fname = name + (name.endsWith('.json') ? '' : '.json');
        if (name !== '') {
            fetch('/maps/' + fname)
                .then((resp) => resp.json())
                .then((resp: type_map) => {
                    const mx = Math.floor(resp.settings.size.width / tile_size);
                    const my = Math.floor(resp.settings.size.height / tile_size);
                    this.setState({
                        name: resp.settings.name,
                        file: name,
                        width: resp.settings.size.width,
                        height: resp.settings.size.height,
                        mwidth: mx,
                        mheight: my,
                        state: readMap(resp),
                    });
                    this.draw();
                })
        } else {
            fetch('/maps/new' + name)
                .then((resp) => resp.json())
                .then((resp: string) => {
                    this.setState({
                        name: "NewMap",
                        file: resp,
                        width: 800,
                        height: 600,
                        mwidth: 800 / tile_size,
                        mheight: 600 / tile_size,
                        state: Array(800 / tile_size).fill(null)
                            .map(() => Array(600 / tile_size).fill(0)),
                    });
                    this.draw();
                })
        }
    }

    saveMap(map: type_map): void {
        const snapshot = this._canvas.toDataURL("png");
        const resp = {
            map: map,
            image: snapshot,
        }
        fetch('/editor/' + this.state.file, {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(resp),
        });
    }

    render(): JSX.Element {
        return <div>
            <Selector maps={this.state.maps} onSelect={this.loadMap} ></ Selector>
            <input type="text" value={this.state.name} onChange={this.updateName}></input>
            <canvas
                ref={this._canvasRef}
                width={this.state.width}
                height={this.state.height}
                onClick={this.handleCanvasClick}
            ></canvas>
            <button onClick={this.handleCanvasSubmit}>Save Map</button>
        </div>
    }
}

function readMap(map: type_map): number[][] {
    const mw = Math.floor(map.settings.size.width / tile_size);
    const mh = Math.floor(map.settings.size.height / tile_size);
    const res = Array(mw).fill(null)
        .map(() => Array(mh).fill(0));

    for (const wall of map.walls) {
        const wx = Math.floor(wall.x / tile_size);
        const wy = Math.floor(wall.y / tile_size);
        const ww = Math.floor(wall.w / tile_size);
        const wh = Math.floor(wall.h / tile_size);

        for (const x of range(wx, wx + ww)) {
            for (const y of range(wy, wy + wh)) {
                res[x][y] = 1;
            }
        }
    }

    return res;
}

function isPure(
    state: number[][],
    x: number,
    y: number,
    w: number,
    h: number,
    pred: (v: number) => boolean
) {
    const substate = state.slice(x, x + w).map((l) => l.slice(y, y + h));
    for (const r of substate) {
        for (const v of r) {
            if (!pred(v)) {
                return false;
            }
        }
    }
    return true;
}

function range(start: number, end: number) {
    return Array(end - start).fill(null)
        .map((_, idx) => start + idx)
}

let cache: { [id: string]: number | [[string, number], number] } = {};
function getElementList(state: number[][])
    : { x: number, y: number, w: number, h: number }[] {
    cache = {};
    _getElementCount(state, 0, 0, state.length, state[0].length);
    return _getElementList(0, 0, state.length, state[0].length);
}

function _getElementList(x: number, y: number, w: number, h: number)
    : { x: number, y: number, w: number, h: number }[] {
    const ind: string = [x, y, w, h].toString();
    if (cache[ind] === 0) {
        return []
    }
    if (cache[ind] === 1) {
        return [{ x: x * tile_size, y: y * tile_size, w: w * tile_size, h: h * tile_size }];
    }
    const dv = cache[ind][0][1]
    let b1: [number, number, number, number];
    let b2: [number, number, number, number];
    if (cache[ind][0][0] === 'x') {
        b1 = [x, y, dv, h];
        b2 = [x + dv, y, w - dv, h];
    } else {
        b1 = [x, y, w, dv];
        b2 = [x, y + dv, w, h - dv];
    }
    return _getElementList(
        b1[0], b1[1], b1[2], b1[3]
    ).concat(_getElementList(b2[0], b2[1], b2[2], b2[3]));
}

function _getElementCount(state: number[][], x: number, y: number, w: number, h: number) {
    const ind: string = [x, y, w, h].toString();
    if (ind in cache) {
        if (cache[ind] === 0 || cache[ind] === 1) {
            return cache[ind];
        } 
        return cache[ind][1];
        
    }

    if (isPure(state, x, y, w, h, (x) => x === 1)) {
        cache[ind] = 1;
        return 1;
    } else if (isPure(state, x, y, w, h, (x) => x !== 1)) {
        cache[ind] = 0;
        return 0;
    }

    const xVals = range(1, w).map(
        (m) => [
            ['x', m],
            _getElementCount(state, x, y, m, h) + _getElementCount(state, x + m, y, w - m, h),
        ]
    );

    const yVals = range(1, h).map(
        (m) => [
            ['y', m],
            _getElementCount(state, x, y, w, m) + _getElementCount(state, x, y + m, w, h - m),
        ]);

    const values = xVals.concat(yVals);
    const res = values.reduce((acc, curr) => {
        if (curr[1] < acc[1]) {
            return curr;
        }
        return acc;
    })
    cache[ind] = res

    return res[1]
}
