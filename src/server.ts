import { getGame } from "./server/game";
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { type_input_set, type_map } from "./server/types";
import { writeJSON } from "./server/utility";
// import * as socketIO from 'socket.io';

// Dependencies
let socketIO = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.set('port', 5000);
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/editor', function (request, response) {
    response.sendFile(path.join(__dirname, 'editor.html'));
});

app.post('/editor/', function (request, response) {
    let map: type_map = request.body;
    writeJSON('maps/test.json', map);
    response.sendStatus(200);
});

app.post('/editor/:fname', function (request, response) {
    let map: type_map = request.body;
    writeJSON('maps/' + request.params.fname, map);
    response.sendStatus(200);
});

// Starts the server
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

let game = getGame();

let inputs: type_input_set = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        let c = game.addPlayer();
        inputs[socket.id] = {
            id: c,
            input: {
                up: false,
                down: false,
                left: false,
                right: false,
                mx: 0,
                my: 0,
                mdown: false,
                mpress: false
            }
        };
        socket.emit('player id', c);
    });

    socket.on('movement', function (data) {
        if (socket.id in inputs) {
            var player = inputs[socket.id];

            // a mouse is pressed if the mouse is now pressed, but wasn't on the past frame
            if (data.mdown && !player.input.mdown) {
                data.mpress = true;
            } else {
                data.mpress = false;
            }
            player.input = data;
        }

    });

    socket.on("disconnect", function () {
        if (inputs.hasOwnProperty(socket.id)) {
            game.removePlayer(inputs[socket.id].id);
            delete inputs[socket.id];
        }
    })
});

const tickRate = 1000 / 60;
let t = (new Date()).getTime();
setInterval(function () {
    let nt = (new Date()).getTime();
    let delta = (nt - t) / 1000; // seconds since the last update

    game.update(delta, inputs);
    let resp = game.getRepr();

    io.sockets.emit('state', resp);

    // update so the following frame does not have the mouse press
    for (let i in inputs) {
        inputs[i].input.mpress = false;
    }

    t = nt;
}, tickRate);