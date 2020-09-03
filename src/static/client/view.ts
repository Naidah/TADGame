import { type_state } from '../../server/types';
import * as render from './renderer/index'
import * as globals from './globals';
import { clamp } from '../../server/utility';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

export function drawGameState(state: type_state, pid: number): void {
    if (canvas.width > 800) {
        canvas.width = 800;
    }
    if (canvas.height > 600) {
        canvas.height = 600;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    let players = state["players"];
    let centre: [number, number] = [0, 0];

    let myPlayer;
    let isFound = false;
    for (let id in players) {
        if (id == pid.toString()) {
            myPlayer = players[id];
            centre = [myPlayer.x, myPlayer.y];
            globals.setViewportX(clamp(myPlayer.x - canvas.width / 2, 0, 800 - canvas.width));
            globals.setViewportY(clamp(myPlayer.y - canvas.height / 2, 0, 600 - canvas.height));
            isFound = true;
        }
    }

    for (let id in players) {
        render.renderCharacter(canvas, centre, players[id], pid);
    }

    for (let p of state["projectiles"]) {
        render.renderProjectile(canvas, centre, p);
    }

    if (isFound && myPlayer.isAlive) {
        render.renderShadow(canvas, centre, myPlayer, state["walls"]);
    }

    if (isFound && !myPlayer.isAlive) {
        context.fillStyle = "grey";
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
    }

    for (let w of state["walls"]) {
        render.renderWall(canvas, centre, w);
    }

    if (isFound) {
        render.renderUI(canvas, myPlayer);
    }
}  