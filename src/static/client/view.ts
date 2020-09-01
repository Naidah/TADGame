import { drawCharacter, drawWall, drawProjectile, drawShadow, drawUI } from './renderer'
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

    let myPlayer;
    let isFound = false;
    for (let id in players) {
        if (id == pid.toString()) {
            myPlayer = players[id];
            isFound = true;
        }
    }
    if (isFound && myPlayer.isAlive) {
        drawShadow(myPlayer, state["walls"]);
    }

    if (isFound && !myPlayer.isAlive) {
        context.fillStyle = "grey";
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
    }

    for (let w of state["walls"]) {
        drawWall(w);
    }

    if (isFound) {
        drawUI(myPlayer);
    }
}  