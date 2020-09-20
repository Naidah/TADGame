import { type_player } from "../../../server/types";

export function renderUI(canvas: HTMLCanvasElement, state: type_player) {
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