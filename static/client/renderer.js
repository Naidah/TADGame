const char_radius = 20;

export function drawCharacter(state) {
    if (state.id == pid) {
        context.fillStyle = 'blue';
    } else {
        context.fillStyle = 'green';
    }

    context.beginPath();
    context.arc(state.x, state.y, char_radius, 0, 2 * Math.PI);
    context.fill();
}