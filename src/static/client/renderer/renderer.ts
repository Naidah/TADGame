import { type_player, type_projectile, type_wall, type_entity } from "../../../server/types";

const char_radius = 20;
const proj_radius = 4;

export function drawCharacter(canvas: HTMLCanvasElement, state: type_player, pid: number): void {
    const context = canvas.getContext('2d');
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

export function drawProjectile(canvas: HTMLCanvasElement, state: type_projectile): void {
    const context = canvas.getContext('2d');
    context.fillStyle = 'red';

    context.beginPath();
    context.arc(state.x, state.y, proj_radius, 0, 2 * Math.PI);
    context.fill();
}

export function drawWall(canvas: HTMLCanvasElement, state: type_wall): void {
    const context = canvas.getContext('2d');
    context.fillStyle = 'pink';

    context.beginPath();
    context.rect(state.x, state.y, state.w, state.h);
    context.fill();
}

export function drawShadow(canvas: HTMLCanvasElement, player: type_entity, walls: type_wall[]): void {
    const context = canvas.getContext('2d');

    let canvasW = 800;
    let canvasH = 600;

    var playerx = player.x;
    var playery = player.y;

    for (let wall of walls) {
        //* going clockwise starting from top left
        let c1x = wall.x;
        let c1y = wall.y;
        let c2x = wall.x + wall.w;
        let c2y = wall.y;
        let c3x = wall.x + wall.w;
        let c3y = wall.y + wall.h;
        let c4x = wall.x;
        let c4y = wall.y + wall.h;

        let leftPointx = 0;
        let leftPointy = 0;
        let rightPointx = 0;
        let rightPointy = 0;

        let x_int1 = 0;
        let x_int2 = 0;
        let y_int1 = 0;
        let y_int2 = 0;

        context.fillStyle = "grey";
        //*deciding which corners to use

        //* middle left
        if (playerx <= c1x && playery >= c1y && playery <= c4y) {
            leftPointx = c1x;
            leftPointy = c1y;
            rightPointx = c4x;
            rightPointy = c4y;

            y_int1 = getInterceptY(leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);
            context.lineTo(canvasW, y_int1);
            context.lineTo(canvasW, y_int2);

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* top left
        } else if (playerx < c1x && playery < c1y) {
            leftPointx = c2x;
            leftPointy = c2y;
            rightPointx = c4x;
            rightPointy = c4y;

            x_int1 = getInterceptX(leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);
            context.lineTo(x_int1, canvasH);
            context.lineTo(canvasW, y_int2);

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* top middle    
        } else if (playerx >= c1x && playerx <= c2x && playery <= c1y) {
            leftPointx = c2x;
            leftPointy = c2y;
            rightPointx = c1x;
            rightPointy = c1y;

            x_int1 = getInterceptX(leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);

            if (isNaN(x_int1)) {
                context.lineTo(leftPointx, canvasH);
            } else {
                context.lineTo(x_int1, canvasH);
            }

            if (isNaN(x_int2)) {
                context.lineTo(rightPointx, canvasH);
            } else {
                context.lineTo(x_int2, canvasH);
            }

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* top right    
        } else if (playerx > c2x && playery < c2y) {
            leftPointx = c3x;
            leftPointy = c3y;
            rightPointx = c1x;
            rightPointy = c1y;

            y_int1 = getInterceptY(leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);
            context.lineTo(0, y_int1);
            context.lineTo(x_int2, canvasH);

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* middle right    
        } else if (playerx >= c2x && playery >= c2y && playery <= c3y) {
            leftPointx = c3x;
            leftPointy = c3y;
            rightPointx = c2x;
            rightPointy = c2y;

            y_int1 = getInterceptY(leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);
            context.lineTo(0, y_int1);
            context.lineTo(0, y_int2);

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* bottom right    
        } else if (playerx > c2x && playery > c3y) {
            leftPointx = c4x;
            leftPointy = c4y;
            rightPointx = c2x;
            rightPointy = c2y;

            x_int1 = getInterceptX(leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);
            context.lineTo(x_int1, 0);
            context.lineTo(0, y_int2);

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* bottom middle    
        } else if (playerx >= c1x && playerx <= c2x && playery >= c4y) {
            leftPointx = c4x;
            leftPointy = c4y;
            rightPointx = c3x;
            rightPointy = c3y;

            x_int1 = getInterceptX(leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);

            if (isNaN(x_int1)) {
                context.lineTo(leftPointx, 0);
            } else {
                context.lineTo(x_int1, 0);
            }

            if (isNaN(x_int2)) {
                context.lineTo(rightPointx, 0);
            } else {
                context.lineTo(x_int2, 0);
            }

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
            //* bottom left    
        } else if (playerx < c1x && playery > c4y) {
            leftPointx = c1x;
            leftPointy = c1y;
            rightPointx = c3x;
            rightPointy = c3y;

            y_int1 = getInterceptY(leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(rightPointx, rightPointy, playerx, playery);
            context.beginPath();
            context.moveTo(leftPointx, leftPointy);
            context.lineTo(canvasW, y_int1);
            context.lineTo(x_int2, 0);

            context.lineTo(rightPointx, rightPointy);
            context.closePath();
            context.fill();
        }
    }
}

function getInterceptX(x1: number, y1: number, x2: number, y2: number): number {
    let g = (y1 - y2) / (x1 - x2);
    let x_int = 0;
    let inf = 99999999999;
    let nInf = -99999999999;
    if (y2 >= y1) {
        x_int = ((g * x1) - y1) / g;
    } else {
        x_int = (600 - y1 + (g * x1)) / g;
    }

    if (x_int == -Infinity) {
        return inf;
    } else if (x_int == Infinity) {
        return nInf;
    } else {
        return x_int;
    }
}

function getInterceptY(x1: number, y1: number, x2: number, y2: number): number {
    let g = (y1 - y2) / (x1 - x2);
    let y_int = 0;
    let inf = 99999999999;
    let nInf = -99999999999;
    if (x2 >= x1) {
        y_int = y1 - (g * x1);
    } else {
        y_int = g * (800 - x1) + y1;
    }

    if (y_int == -Infinity) {
        return inf;
    } else if (y_int == Infinity) {
        return nInf;
    } else {
        return y_int;
    }
}

export function drawUI(canvas: HTMLCanvasElement, state: type_player) {
    const context = canvas.getContext('2d');
    context.fillStyle = "black";
    context.beginPath();
    context.rect(20, canvas.height - 40, 150, 20);
    context.fill();

    context.fillStyle = "red";
    context.beginPath();
    context.rect(20, canvas.height - 40, (150 * state.hp) / 100, 20);
    context.fill();

    context.font = "30px Arial";
    context.textAlign = "end";
    context.fillText(state.ammo.toString(), 60, canvas.height - 60);
}