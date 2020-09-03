import { type_player } from "../../../server/types";
import * as globals from "../globals";

const char_radius = 20;

export function renderCharacter(canvas: HTMLCanvasElement, centre: [number, number], state: type_player, pid: number): void {
    const context = canvas.getContext('2d');

    let viewportX = globals.getViewportX();
    let viewportY = globals.getViewportY();

    if (state.id == pid) {
        context.fillStyle = 'blue';
    } else {
        context.fillStyle = 'green';
    }

    let x = state.x - viewportX;
    let y = state.y - viewportY;
    context.beginPath();
    context.arc(x, y, char_radius, 0, 2 * Math.PI);
    context.fill();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 50 * Math.cos(state.direction), y + 50 * Math.sin(state.direction));
    context.closePath();
    context.stroke();
}