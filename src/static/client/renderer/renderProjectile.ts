import * as globals from "../globals";
import { type_projectile } from "../../../server/types";

const proj_radius = 4;

export function renderProjectile(canvas: HTMLCanvasElement, state: type_projectile): void {
    const context = canvas.getContext('2d');

    const viewportX = globals.getViewportX();
    const viewportY = globals.getViewportY();

    const x = state.x - viewportX;
    const y = state.y - viewportY;

    context.fillStyle = 'red';

    context.beginPath();
    context.arc(x, y, proj_radius, 0, 2 * Math.PI);
    context.fill();
}
