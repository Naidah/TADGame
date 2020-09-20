import * as globals from "../globals";
import { type_wall } from "../../../server/types";

export function renderWall(
    canvas: HTMLCanvasElement,
    centre: [number, number],
    state: type_wall
): void {
    const context = canvas.getContext('2d');

    const viewportX = globals.getViewportX();
    const viewportY = globals.getViewportY();

    const x = state.x - viewportX;
    const y = state.y - viewportY;

    context.fillStyle = 'pink';

    context.beginPath();
    context.rect(x, y, state.w, state.h);
    context.fill();
}
