import { useRef, useEffect, useState } from "react";

function draw(ctx, coord) {
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, 10, 0, 2 * Math.PI);
    ctx.stroke();
}

export function useCanvas() {
    const canvasRef = useRef(null);
    const [coord, setCoord] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');

        draw(ctx, coord);
    });

    return [setCoord, canvasRef]
}