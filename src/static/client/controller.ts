import * as globals from "./globals";
import { type_input } from "../../server/types";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    mx: 0,
    my: 0,
    mdown: false,
    reload: false
} as type_input;


function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top,
    };
}

canvas.addEventListener('mousemove', (evt) => {
    const mousePos = getMousePos(canvas, evt);
    movement.mx = mousePos.x + globals.getViewportX();
    movement.my = mousePos.y + globals.getViewportY();
}, false);

document.addEventListener('keydown', (event) => {
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
    case 82: // R
        movement.reload = true;
        break;
    }
});
document.addEventListener('keyup', (event) => {
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
    case 82: // R
        movement.reload = false;
        break;
    }
});

document.addEventListener("mousedown", () => {
    movement.mdown = true;
});

document.addEventListener("mouseup", () => {
    movement.mdown = false;
})

export function getMovement(): type_input {
    return movement
}

