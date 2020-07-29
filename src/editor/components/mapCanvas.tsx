import * as React from 'react';
import { type_map } from '../../server/types';

const tile_size = 50;

export class MapCanvas extends React.Component<{ name?: string, width: number, height: number, onSubmit: (type_map) => void },
    { name: string, mwidth: number, mheight: number, state: number[][] }> {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    constructor(props) {
        super(props);
        let mw = Math.floor(this.props.width / tile_size);
        let mh = Math.floor(this.props.height / tile_size);

        this.state = {
            name: this.props.name ? this.props.name : 'NewMap',
            mwidth: mw, mheight: mh,
            state: Array(mw).fill(null).map(() => Array(mh).fill(0))
        };

        this.handleCanvasClick = this.handleCanvasClick.bind(this);
        this.handleCanvasSubmit = this.handleCanvasSubmit.bind(this);
    }

    componentDidMount() {
        this._canvas = this.refs.canvas as HTMLCanvasElement;
        this._ctx = this._canvas.getContext("2d");
        this.draw();
    }

    draw() {
        this._ctx.clearRect(0, 0, this.props.width, this.props.height);
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
                    width: this.props.width,
                    height: this.props.height
                }
            },
            walls: []
        };
        this.state.state.forEach((vx, cx) => {
            vx.forEach((vy, cy) => {
                if (vy == 1) {
                    res.walls.push({ x: cx * tile_size, y: cy * tile_size, w: tile_size, h: tile_size });
                }
            });
        });

        this.props.onSubmit(res);
    }

    render() {
        return <div>
            <canvas ref="canvas" width={this.props.width} height={this.props.height} onClick={this.handleCanvasClick}></canvas>
            <button onClick={this.handleCanvasSubmit}>Save Map</button>
        </div>
    }
}