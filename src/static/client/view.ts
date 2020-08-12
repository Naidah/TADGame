import { drawCharacter, drawWall, drawProjectile, drawShadow } from './renderer'
import { type_state } from '../../server/types';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

export function drawGameState(state: type_state, pid: number): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let players = state["players"];
    for (let id in players) {
        drawCharacter(players[id], pid);
    }

    for (let p of state["projectiles"]) {
        drawProjectile(p);
    }

    let isAlive = false;
    for (let id in players) {
        if (id == pid.toString()) {
            drawShadow(players[id], state["walls"]);
            isAlive = true;
        }
    }

    if (!isAlive) {
        context.fillStyle = "grey";
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
    }

    for (let w of state["walls"]) {
        drawWall(w);
    }
}