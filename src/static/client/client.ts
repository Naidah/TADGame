import * as io from 'socket.io-client'
import { drawGameState } from './view'
import { getMovement } from './controller'
import { type_state } from '../../server/types';

// declare global vars needed across the application
// variables used to communicate with server
const socket = io();
const tickRate = 1000 / 30;

// player id of this client instance
let pid = -1;

// declare this player has joined
socket.emit('new player');
// set this instances id
socket.on("player id", (val) => {
    pid = val;
});

// update movement to the server
setInterval(() => {
    socket.emit('movement', getMovement());
}, tickRate);

socket.on('state', (state: type_state) => drawGameState(state, pid));
