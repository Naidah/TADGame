import * as globals from './globals';
import * as render from './renderer/index'
import _ from "underscore";
import { clamp } from '../../server/utility';
import { type_state } from '../../server/types';

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
    const players = state.players;
    let centre: [number, number] = [0, 0];

    let myPlayer;
    let isFound = false;
    for (const id in players) {
        if (id === pid.toString()) {
            myPlayer = players[id];
            centre = [myPlayer.x, myPlayer.y];
            globals.setViewportX(clamp(myPlayer.x - canvas.width / 2, 0, 800 - canvas.width));
            globals.setViewportY(clamp(myPlayer.y - canvas.height / 2, 0, 600 - canvas.height));
            isFound = true;
        }
    }

    // for (let id in players) {
    //     render.renderCharacter(canvas, centre, players[id], pid);
    // }

    _.forEach(_.filter(players, (p) => p.isAlive),
        (p) => render.renderCharacter(canvas, p, pid));

    for (const p of state.projectiles) {
        render.renderProjectile(canvas, p);
    }

    if (isFound && myPlayer.isAlive) {
        render.renderShadow(canvas, myPlayer, state.walls);
    }

    if (isFound && !myPlayer.isAlive) {
        context.fillStyle = "grey";
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fill();
    }

    for (const w of state.walls) {
        render.renderWall(canvas, centre, w);
    }

    if (isFound) {
        render.renderUI(canvas, myPlayer);
    }
}
