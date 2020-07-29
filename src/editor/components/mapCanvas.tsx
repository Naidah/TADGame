import * as React from 'react';
import { Selector } from './selector'
import { type_map } from '../../server/types';

const tile_size = 50;

function isPure(state: number[][], x: number, y: number, w: number, h: number, pred: (v: number) => boolean) {
    let substate = state.slice(x, x + w).map(l => l.slice(y, y + h));
    for (let r of substate) {
        for (let v of r) {
            if (!pred(v)) {
                return false;
            }
        }
    }
    return true;
}

function range(start: number, end: number) {
    return Array(end - start).fill(null).map((_, idx) => start + idx)
}

let cache: { [id: string]: number | [[string, number], number] } = {};
function getElementList(state: number[][]) {
    cache = {};
    console.log(_getElementCount(state, 0, 0, state.length, state[0].length));
    return _getElementList(0, 0, state.length, state[0].length);
}

function _getElementList(x: number, y: number, w: number, h: number)
    : { x: number, y: number, w: number, h: number }[] {
    let ind: string = [x, y, w, h].toString();
    if (cache[ind] == 0) {
        return []
    }
    if (cache[ind] == 1) {
        return [{ x: x * tile_size, y: y * tile_size, w: w * tile_size, h: h * tile_size }];
    }
    let dv = cache[ind][0][1]
    let b1: [number, number, number, number];
    let b2: [number, number, number, number];
    if (cache[ind][0][0] == 'x') {
        b1 = [x, y, dv, h];
        b2 = [x + dv, y, w - dv, h];
    } else {
        b1 = [x, y, w, dv];
        b2 = [x, y + dv, w, h - dv];
    }
    return _getElementList(b1[0], b1[1], b1[2], b1[3]).concat(_getElementList(b2[0], b2[1], b2[2], b2[3]));
}

function _getElementCount(state: number[][], x: number, y: number, w: number, h: number) {
    let ind: string = [x, y, w, h].toString();
    if (ind in cache) {
        if (cache[ind] == 0 || cache[ind] == 1) {
            return cache[ind];
        } else {
            return cache[ind][1];
        }
    }

    if (isPure(state, x, y, w, h, (x) => x == 1)) {
        cache[ind] = 1;
        return 1;
    } else if (isPure(state, x, y, w, h, (x) => x != 1)) {
        cache[ind] = 0;
        return 0;
    }

    let xVals = range(1, w).map((m) => {
        return [['x', m], _getElementCount(state, x, y, m, h) + _getElementCount(state, x + m, y, w - m, h)]
    });
    let yVals = range(1, h).map((m) => {
        return [['y', m], _getElementCount(state, x, y, w, m) + _getElementCount(state, x, y + m, w, h - m)]
    });

    let values = xVals.concat(yVals);
    let res = values.reduce((acc, curr) => {
        if (curr[1] < acc[1]) {
            return curr;
        }
        return acc;
    })
    cache[ind] = res

    return res[1]
}
export class MapCanvas extends React.Component<{}, {
    file: string,
    name: string,
    width: number,
    height: number;
    mwidth: number,
    mheight: number,
    state: number[][]
}> {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    constructor(props) {
        super(props);
        let mw = Math.floor(800 / tile_size);
        let mh = Math.floor(600 / tile_size);

        this.state = {
            file: '',
            name: 'NewMap',
            width: 800, height: 600,
            mwidth: mw, mheight: mh,
            state: Array(mw).fill(null).map(() => Array(mh).fill(0))
        };

        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleCanvasSubmit = this.handleCanvasSubmit.bind(this);
        this.updateName = this.updateName.bind(this);
        this.loadMap = this.loadMap.bind(this);
        this.saveMap = this.saveMap.bind(this);
    }

    componentDidMount() {
        this._canvas = this.refs.canvas as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this.draw();
    }

    draw() {
        this._ctx.clearRect(0, 0, this.state.width, this.state.height);
        this.state.state.forEach((vx, cx) => {
            vx.forEach((vy, cy) => {
                if (vy == 1) {
                    this._ctx.beginPath();
                    this._ctx.rect(cx * tile_size, cy * tile_size, tile_size, tile_size);
                    this._ctx.fill();
                }
            });
        });
    }

    updateName(event) {
        this.setState({ name: event.target.value });
    }

    handleCanvasClick(event) {
        var rect = this._canvas.getBoundingClientRect();
        let cx = event.clientX - rect.left;
        let cy = event.clientY - rect.top;

        let mx = Math.floor(cx / tile_size);
        let my = Math.floor(cy / tile_size);

        if (this.state.state[mx][my] != 1) {
            this.state.state[mx][my] = 1;
        } else {
            this.state.state[mx][my] = 0;
        }

        this.draw();
    }

    handleCanvasSubmit(event) {
        let res: type_map = {
            settings: {
                name: this.state.name,
                size: {
                    width: this.state.width,
                    height: this.state.height
                }
            },
            walls: []
        };
        res.walls = getElementList(this.state.state);
        this.saveMap(res);
    }

    loadMap(name: string) {
        if (name != '') {
            fetch('/maps/' + name)
                .then(resp => resp.json())
                .then((resp: type_map) => {
                    this.setState({
                        name: resp.settings.name,
                        file: name,
                        width: resp.settings.size.width,
                        height: resp.settings.size.height
                    })
                })
        }
    }

    saveMap(map: type_map) {
        console.log(map);
        fetch('/editor/' + this.state.file, {
            method: "POST",
            cache: 'no-cache',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(map)
        });
    }

    render() {
        return <div>
            <Selector onSelect={this.loadMap} ></ Selector>
            <input type="text" value={this.state.name} onChange={this.updateName}></input>
            <canvas ref="canvas" width={this.state.width} height={this.state.height} onClick={this.handleCanvasClick}></canvas>
            <button onClick={this.handleCanvasSubmit}>Save Map</button>
        </div>
    }
}