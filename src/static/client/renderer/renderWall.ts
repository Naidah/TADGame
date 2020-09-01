import { type_wall } from "../../../server/types";
import * as globals from "../globals";

export function renderWall(canvas: HTMLCanvasElement, centre: [number, number], state: type_wall): void {
    const context = canvas.getContext('2d');

    let viewportX = globals.getViewportX();
    let viewportY = globals.getViewportY();

    let x = state.x - viewportX;
    let y = state.y - viewportY;

    context.fillStyle = 'pink';

    context.beginPath();
    context.rect(x, y, state.w, state.h);
    context.fill();
}