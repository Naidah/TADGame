import {getRenderer} from './renderer.js'

class Character {
    constructor() {
        this._x = 95;
        this._y = 40;
    }

    draw() {
        let r = getRenderer();
        let ctx = r.getContext();
        console.log(ctx);

        ctx.beginPath();
        ctx.arc(this._x, this._y, 20, 0, 2 * Math.PI);
        ctx.stroke();
    }

    move(mx, my) {
        this._x += mx;
        this._y += my;
    }
}

(function launch() {
    let char = new Character();
    char.draw();
    console.log("test");
})()