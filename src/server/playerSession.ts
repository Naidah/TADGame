import { Lobby } from "./lobby";

export class PlayerSession {
    static players: PlayerSession[] = [];
    private _socket: SocketIO.Socket;
    private _lobby: Lobby;
    private _name: string;
    private _loadout: { weapon: string, ability: string, perk: string };
    private constructor(socket: SocketIO.Socket) {
        this.setName = this.setName.bind(this);
        this.setLoadout = this.setLoadout.bind(this);

        this.bindSocket(socket);
    }

    private bindSocket(socket: SocketIO.Socket) {
        this._socket = socket;
        socket.on("setLoadout", this.setLoadout);
        socket.on("setUsername", this.setName);
    }

    setLoadout(loadout) {
        console.log(loadout);
        this._loadout = loadout;
    }

    setName(name: string) {
        this._name = name;
        if (this.lobby) {
            this.lobby.sendUpdate();
        }
    }

    emit(cmd: string, msg?: any): void {
        this._socket.emit(cmd, msg);
    }

    get id() {
        return this._socket.id;
    }

    get loadout() {
        return this._loadout;
    }

    get name(): string {
        return this._name;
    }

    get lobby() {
        return this._lobby;
    }

    set lobby(lobby: Lobby) {
        this._lobby = lobby;
    }

    set socket(socket: SocketIO.Socket) {
        this.bindSocket(socket);
    }

    leave() {
        if (this.lobby) {
            this.lobby.leave(this);
            this.lobby = null;
        }
    }

    private destroy() {
        this.leave();
    }

    static create(socket: SocketIO.Socket): PlayerSession {
        const p = new PlayerSession(socket);
        PlayerSession.players.push(p);
        return p;
    }

    static get(id: any): PlayerSession {
        return PlayerSession.players.find((player) => player.id === id);
    }

    static remove(p: PlayerSession): void {
        const i = PlayerSession.players.indexOf(p);
        if (i !== -1) {
            p.destroy();
            PlayerSession.players.splice(i, 1);
        }
    }
}
