import { type_player, type_projectile, type_wall } from "../../server/types";

const char_radius = 20;
const proj_radius = 4;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

export function drawCharacter(state: type_player, pid: number): void {
    if (state.id == pid) {
        context.fillStyle = 'blue';
    } else {
        context.fillStyle = 'green';
    }

    context.beginPath();
    context.arc(state.x, state.y, char_radius, 0, 2 * Math.PI);
    context.fill();

    context.beginPath();
    context.moveTo(state.x, state.y);
    context.lineTo(state.x + 50 * Math.cos(state.direction), state.y + 50 * Math.sin(state.direction));
    context.closePath();
    context.stroke();
}

export function drawProjectile(state: type_projectile): void {
    context.fillStyle = 'red';

    context.beginPath();
    context.arc(state.x, state.y, proj_radius, 0, 2 * Math.PI);
    context.fill();
}

export function drawWall(state: type_wall): void {
    context.fillStyle = 'pink';

    context.beginPath();
    context.rect(state.x, state.y, state.w, state.h);
    context.fill();
}