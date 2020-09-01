import { type_input } from "../../server/types";
import * as globals from "./globals";

let canvas = document.getElementById('canvas') as HTMLCanvasElement;

let movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    mx: 0,
    my: 0,
    mdown: false
} as type_input;


function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    movement.mx = mousePos.x + globals.getViewportX();
    movement.my = mousePos.y + globals.getViewportY();
}, false);

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

document.addEventListener("mousedown", function (event) {
    movement.mdown = true;
});

document.addEventListener("mouseup", function (event) {
    movement.mdown = false;
})

export function getMovement(): type_input {
    return movement
}

