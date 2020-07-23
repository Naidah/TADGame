import * as io from 'socket.io-client'
import { getMovement } from './controller'
import { drawGameState } from './view'

// declare global vars needed across the application
// variables used to communicate with server
let socket = io();
let tickRate = 1000 / 30;

// player id of this client instance
let pid = -1;

// setup for drawing to canvas
let canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;

// declare this player has joined
socket.emit('new player');
// set this instances id
socket.on("player id", function (val) {
    pid = val;
});

// update movement to the server
setInterval(function () {
    socket.emit('movement', getMovement());
}, tickRate);

socket.on('state', (state) => drawGameState(state, pid));
