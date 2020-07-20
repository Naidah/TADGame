import {drawCharacter} from './renderer.js'

socket.on('state', function(players) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let id in players) {
        drawCharacter(players[id]);
    }
});