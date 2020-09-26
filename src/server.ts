import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as socketIO from 'socket.io';
import { readJSON, writeJSON, writePNG } from "./server/utility";
import { type_input_set, type_map } from "./server/types";
import { Lobby } from "./server/lobby";
import { PlayerSession } from "./server/playerSession";
import { getGame } from "./server/game";

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.set('port', 5000);
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'game.html'));
});

app.get('/editor', (request, response) => {
    response.sendFile(path.join(__dirname, 'editor.html'));
});

app.get('/lobby', (request, response) => {
    response.sendFile(path.join(__dirname, "menu.html"));
})

app.get('/maps/new', (request, response) => {
    let x = 1;
    const index = readJSON('index.json') as {[map: string]: string};
    while ("map" + x in index) {
        x += 1;
    }
    response.send(JSON.stringify("map" + x));
})

app.post('/editor/:fname', (request, response) => {
    const msg: { map: type_map, image: string } = request.body;
    const map = msg.map;
    const image = msg.image;
    writeJSON('maps/' + request.params.fname, map);
    writePNG(path.join('maps', 'images', request.params.fname), image);
    const index = readJSON('index.json');
    index[request.params.fname] = map.settings.name;
    writeJSON('index.json', index);
    response.sendStatus(200);
});

// Starts the server
server.listen(5000, () => {
    // eslint-disable-next-line no-console
    console.log('Starting server on port 5000');
});

const game = getGame();

const inputs: type_input_set = {};
io.on('connection', (socket) => {
    PlayerSession.create(socket);

    socket.on('getActiveLobbies', (callback: (list: [number, string, number][]) => void) => {
        callback(Lobby.getAll().map((l) => [l.id, l.name, l.size]))
    });

    socket.on('createLobby', (callback: (id: number) => void) => {
        callback(Lobby.create().id);
    });

    socket.on("joinLobby", (id: number) => {
        const l = Lobby.get(id);
        if (l) {
            l.join(PlayerSession.get(socket.id));
        }
    });

    socket.on("leaveLobby", () => {
        const p = PlayerSession.get(socket.id);
        if (p) {
            p.leave();
        }
    })

    socket.on("updateLobby", (state: { map: string, name: string }) => {
        const p = PlayerSession.get(socket.id);
        if (p && p.lobby) {
            p.lobby.update(state);
        }
    });

    socket.on('new player', () => {
        const c = game.addPlayer();
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
                mpress: false,
            },
        };
        socket.emit('player id', c);
    });

    socket.on('movement', (data) => {
        if (socket.id in inputs) {
            const player = inputs[socket.id];

            // a mouse is pressed if the mouse is now down, but wasn't on the past frame
            if (data.mdown && !player.input.mdown) {
                data.mpress = true;
            } else {
                data.mpress = false;
            }
            player.input = data;
        }
    });

    socket.on("disconnect", () => {
        const p = PlayerSession.get(socket.id);
        if (p) {
            PlayerSession.remove(p);
        }

        if (inputs[socket.id]) {
            game.removePlayer(inputs[socket.id].id);
            delete inputs[socket.id];
        }
    });
});

const tickRate = 1000 / 60;
let t = new Date().getTime();
setInterval(() => {
    const nt = new Date().getTime();
    const delta = (nt - t) / 1000; // seconds since the last update

    game.update(delta, inputs);
    const resp = game.getRepr();
    io.sockets.emit('state', resp);

    // update so the following frame does not have the mouse press
    for (const i in inputs) {
        inputs[i].input.mpress = false;
    }

    t = nt;
}, tickRate);
