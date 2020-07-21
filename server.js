import {
    Character
} from './server/character.js';
import {
    Wall
} from './server/wall.js';

// Dependencies
let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');

let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'))

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Starts the server
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

let walls = [new Wall(400, 400, 50, 50)];

let players = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        let c = new Character();
        players[socket.id] = {
            player: c,
            input: {
                up: false,
                down: false,
                left: false,
                right: false
            }
        };
        socket.emit('player id', c.id);
    });

    socket.on('movement', function (data) {
        var player = players[socket.id] || {};
        player.input = data;
    });
});

const tickRate = 1000 / 60;
let t = (new Date()).getTime();
setInterval(function () {
    let nt = (new Date()).getTime();
    let resp = {};
    let delta = (nt - t) / tickRate;
    let presp = {};
    let wresp = [];

    for (const [key, p] of Object.entries(players)) {
        p.player.update(delta, p.input);
        presp[p.player.id] = p.player.getRepr();
    }
    resp["players"] = presp;

    for (let w of walls) {
        wresp.push(w.getRepr());
    }
    resp["walls"] = wresp;

    io.sockets.emit('state', resp);
    t = nt;
}, tickRate);