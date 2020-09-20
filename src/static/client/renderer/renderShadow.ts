import * as globals from "../globals";
import { type_entity, type_wall } from "../../../server/types";

export function renderShadow(
    canvas: HTMLCanvasElement,
    player: type_entity,
    walls: type_wall[]
): void {
    const context = canvas.getContext('2d');

    const viewportX = globals.getViewportX();
    const viewportY = globals.getViewportY();

    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const playerx = player.x - viewportX;
    const playery = player.y - viewportY;

    for (const wall of walls) {
        //* going clockwise starting from top left
        const c1x = wall.x - viewportX;
        const c1y = wall.y - viewportY;
        const c2x = wall.x + wall.w - viewportX;
        const c2y = wall.y - viewportY;
        const c3x = wall.x + wall.w - viewportX;
        const c3y = wall.y + wall.h - viewportY;
        const c4x = wall.x - viewportX;
        const c4y = wall.y + wall.h - viewportY;

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

            y_int1 = getInterceptY(canvasW, leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(canvasW, rightPointx, rightPointy, playerx, playery);
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

            x_int1 = getInterceptX(canvasH, leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(canvasW, rightPointx, rightPointy, playerx, playery);
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

            x_int1 = getInterceptX(canvasH, leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(canvasH, rightPointx, rightPointy, playerx, playery);
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

            y_int1 = getInterceptY(canvasW, leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(canvasH, rightPointx, rightPointy, playerx, playery);
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

            y_int1 = getInterceptY(canvasW, leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(canvasW, rightPointx, rightPointy, playerx, playery);
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

            x_int1 = getInterceptX(canvasH, leftPointx, leftPointy, playerx, playery);
            y_int2 = getInterceptY(canvasW, rightPointx, rightPointy, playerx, playery);
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

            x_int1 = getInterceptX(canvasH, leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(canvasH, rightPointx, rightPointy, playerx, playery);
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

            y_int1 = getInterceptY(canvasW, leftPointx, leftPointy, playerx, playery);
            x_int2 = getInterceptX(canvasH, rightPointx, rightPointy, playerx, playery);
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

function getInterceptX(my: number, x1: number, y1: number, x2: number, y2: number): number {
    const g = (y1 - y2) / (x1 - x2);
    let x_int = 0;
    const inf = 99999999999;
    const nInf = -99999999999;
    if (y2 >= y1) {
        x_int = (g * x1 - y1) / g;
    } else {
        x_int = (my - y1 + g * x1) / g;
    }

    if (x_int === -Infinity) {
        return inf;
    } else if (x_int === Infinity) {
        return nInf;
    } 
    return x_int;
    
}

function getInterceptY(mx: number, x1: number, y1: number, x2: number, y2: number): number {
    const g = (y1 - y2) / (x1 - x2);
    let y_int = 0;
    const inf = 99999999999;
    const nInf = -99999999999;
    if (x2 >= x1) {
        y_int = y1 - g * x1;
    } else {
        y_int = g * (mx - x1) + y1;
    }

    if (y_int === -Infinity) {
        return inf;
    } else if (y_int === Infinity) {
        return nInf;
    } 
    return y_int;
    
}
