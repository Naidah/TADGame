import {
    drawCharacter,
    drawWall,
    drawProjectile
} from './renderer.js'

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

export function drawGameState(state, pid) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let players = state["players"];
    for (let id in players) {
        drawCharacter(players[id], pid);
    }

    for (let w of state["walls"]) {
        drawWall(w);
    }

    for (let p of state["projectiles"]) {
        drawProjectile(p);
    }
}