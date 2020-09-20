import { drawCharacter, drawProjectile, drawShadow, drawWall } from './renderer'
import { type_state } from '../../server/types';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

export function drawGameState(state: type_state, pid: number): void {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const players = state.players;
    for (const id in players) {
        drawCharacter(players[id], pid);
    }

    for (const p of state.projectiles) {
        drawProjectile(p);
    }

    for (const id in players) {
        if (id === pid.toString()) {
            drawShadow(players[id], state.walls)
        }
    }

    for (const w of state.walls) {
        drawWall(w);
    }
}
