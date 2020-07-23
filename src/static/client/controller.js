let canvas = document.getElementById('canvas');

let movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    mx: 0,
    my: 0,
    mdown: false
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

canvas.addEventListener('mousemove', function (evt) {
    var mousePos = getMousePos(canvas, evt);
    movement.mx = mousePos.x;
    movement.my = mousePos.y;
}, false);

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = true;
            break;
        case 87: // W
            movement.up = true;
            break;
        case 68: // D
            movement.right = true;
            break;
        case 83: // S
            movement.down = true;
            break;
    }
});
document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 65: // A
            movement.left = false;
            break;
        case 87: // W
            movement.up = false;
            break;
        case 68: // D
            movement.right = false;
            break;
        case 83: // S
            movement.down = false;
            break;
    }
});

document.addEventListener("mousedown", function (event) {
    movement.mdown = true;
});

document.addEventListener("mouseup", function (event) {
    movement.mdown = false;
})


window.onunload = function () {
    socket.emit("leaving player");
};

export function getMovement() {
    return movement
}

