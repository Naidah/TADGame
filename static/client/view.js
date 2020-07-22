import { drawCharacter, drawWall } from './renderer.js'

socket.on('state', function (state) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let players = state["players"];
    for (let id in players) {
        drawCharacter(players[id]);
    }

    for (let w of state["walls"]) {
        drawWall(w);
    }
});