import * as React from 'react';
import * as globals from '../globals';
import * as styles from './styles/lobbylist.css'

interface Props {
    onChange: (id: number) => void,
}

interface State {
    lobbies: [number, string, number][]
}

export class LobbyList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.setLobbies = this.setLobbies.bind(this);
        this.updateLobbies = this.updateLobbies.bind(this);
        this.createLobby = this.createLobby.bind(this);
        this.joinLobby = this.joinLobby.bind(this);

        this.state = { lobbies: [] }
        this.updateLobbies();
    }

    setLobbies(lobbyList: [number, string, number][]): void {
        this.setState({ lobbies: lobbyList });
    }

    updateLobbies(): void {
        globals.socket.emit("getActiveLobbies", this.setLobbies);
    }

    joinLobby(id: number): void {
        globals.socket.emit("joinLobby", id);
        this.props.onChange(id);
    }

    createLobby(): void {
        globals.socket.emit("createLobby", this.joinLobby);
    }

    render(): JSX.Element {
        return <div id="lobby-list" className="lobbylist">
            <h2>Lobbies</h2>
            <div className={styles["lobbylist-controls"]}>
                <button
                    className={styles["lobbylist-controls-newlobby"]}
                    onClick={this.createLobby}
                >
                    New Lobby
                </button>
                <button
                    className={styles["lobbylist-controls-refresh"]}
                    onClick={this.updateLobbies}
                >
                    Refresh
                </button>
            </div>
            <ul className={styles["lobbylist-list"]}>
                {this.state.lobbies.map((lobby) => <li key={lobby[0]}>
                    <div>{lobby[1]}</div>
                    <div className={styles["lobbylist-list-controls"]}>
                        <div className={styles["lobbylist-list-playercount"]}>
                            {lobby[2]}/10
                        </div>
                        <button
                            className={styles["lobbylist-list-join"]}
                            onClick={() => this.joinLobby(lobby[0])}
                        >
                            Join
                        </button>
                    </div>
                </li>)}
            </ul>
        </div>
    }
}
