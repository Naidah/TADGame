import { type_player, type_projectile, type_wall, type_entity } from "../../server/types";

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

export function drawShadow(state: type_entity, state2: type_wall): void {
    console.log(state);
    let canvasW = 800;
    let canvasH = 600;

    let playerx = state.x;
    let playery = state.y;
    //* going clockwise starting from top left
    let c1x = state2.x;
    let c1y = state2.y;
    let c2x = state2.x + state2.w;
    let c2y = state2.y;
    let c3x = state2.x + state2.w;
    let c3y = state2.y + state2.h;
    let c4x = state2.x;
    let c4y = state2.y + state2.h;

    let leftPointx = 0;
    let leftPointy = 0;
    let rightPointx = 0;
    let rightPointy = 0;

    //*deciding which corners to use
    if (playerx <= c1x && playery >= c1y && playery <= c4y) {
        leftPointx = c1x;
        leftPointy = c1y;
        rightPointx = c4x;
        rightPointy = c4y;
    } else if (playerx <= c1x && playery <= c1y) {
        leftPointx = c2x;
        leftPointy = c2y;
        rightPointx = c4x;
        rightPointy = c4y;
    } else if (playerx >= c1x && playerx <= c2x && playery <= c1y) {
        leftPointx = c1x;
        leftPointy = c1y;
        rightPointx = c2x;
        rightPointy = c2y;
    } else if (playerx >= c2x && playery <= c2y) {
        leftPointx = c1x;
        leftPointy = c1y;
        rightPointx = c3x;
        rightPointy = c3y;
    } else if (playerx >= c2x && playery >= c2y && playery >= c3y) {
        leftPointx = c3x;
        leftPointy = c3y;
        rightPointx = c2x;
        rightPointy = c2y;
    } else if (playerx >= c2x && playery >= c3y) {
        leftPointx = c4x;
        leftPointy = c4y;
        rightPointx = c2x;
        rightPointy = c2y;
    } else if (playerx >= c1x && playerx <= c2x && playery >= c4y) {
        leftPointx = c4x;
        leftPointy = c4y;
        rightPointx = c3x;
        rightPointy = c3y;
    } else if (playerx <= c1x && playery >= c4y) {
        leftPointx = c1x;
        leftPointy = c1y;
        rightPointx = c3x;
        rightPointy = c3y;
    }

    let g1 = (leftPointy - playery) / (leftPointx - playerx);
    let g2 = (rightPointy - playery) / (rightPointx - playerx);

    let lx_int = ((g1 * leftPointx) - leftPointy) / g1;
    let ly_int = leftPointy - (g1 * leftPointx);

    let rx_int = (600 - (g2 * rightPointx) - rightPointy) / g2;
    let ry_int = (g2 * (800 - rightPointx)) + rightPointy;

    context.fillStyle = "grey";

    context.beginPath();
    context.moveTo(leftPointx, leftPointy);
    context.lineTo(lx_int, 0);
    context.lineTo(800, ry_int);
    context.lineTo(rightPointx, rightPointy);
    context.closePath();
    context.fill();
}

function getInterceptX() {

}

