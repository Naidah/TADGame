import { type_projectile } from "../../../server/types";
import * as globals from "../globals";

const proj_radius = 4;

export function renderProjectile(canvas: HTMLCanvasElement, centre: [number, number], state: type_projectile): void {
    const context = canvas.getContext('2d');

    let viewportX = globals.getViewportX();
    let viewportY = globals.getViewportY();

    let x = state.x - viewportX;
    let y = state.y - viewportY;

    context.fillStyle = 'red';

    context.beginPath();
    context.arc(x, y, proj_radius, 0, 2 * Math.PI);
    context.fill();
}