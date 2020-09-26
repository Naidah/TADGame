import { PlayerSession } from "./playerSession";

export class Lobby {
    private static room_id = 1;
    private static max_members = 4;
    private static lobbies: Lobby[] = [];

    private _id: number;
    private _members: PlayerSession[];

    private _map: string;
    private _name: string;

    private constructor() {
        this._id = Lobby.room_id++;
        this._members = [];
    }

    join(member: PlayerSession): boolean {
        if (this._members.length >= Lobby.max_members) {
            return false;
        }
        this._members.push(member);
        member.lobby = this;
        this.sendUpdate();
        return true;
    }

    leave(member: PlayerSession): boolean {
        const i = this._members.indexOf(member);
        if (i === -1) {
            return false;
        }
        this._members.splice(i, 1);
        if (this._members.length === 0) {
            Lobby.remove(this);
        }
        this.sendUpdate();
        return true;
    }

    close(): void {
        while (this.size > 0) {
            this.leave(this._members[0]);
        }
    }

    sendUpdate(): void {
        this._members.forEach((p, i) => p.emit("updateLobby", {
            isLeader: i === 0,
            map: this._map,
            name: this._name,
            players: this._members.map((p) => p.name),
        }));
    }

    update(state: { map: string, name: string }): void {
        this._map = state.map;
        this._name = state.name;
        this.sendUpdate();
    }

    start(): boolean {
        return false;
    }

    end(): void {
        return;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return `game${this._id}`
    }

    get size(): number {
        return this._members.length;
    }

    static create(): Lobby {
        const l = new Lobby();
        Lobby.lobbies.push(l);
        return l;
    }

    static remove(l: Lobby): void {
        const i = Lobby.lobbies.indexOf(l);
        if (i !== -1) {
            Lobby.lobbies.splice(i, 1);
        }
    }

    static get(id: number): Lobby {
        // return Lobby.lobbies[0];
        return Lobby.lobbies.find((l) => l.id === id);
    }

    static getAll(): Lobby[] {
        return Lobby.lobbies;
    }
}
