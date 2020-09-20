import * as React from 'react';
import * as globals from '../globals';
import * as styles from './styles/lobbyMenu.css';
import { ButtonPanel } from './ButtonPanel';
import { Chat } from './chat';
import { PlayerList } from './playerlist';
import { type_button_info } from '../../server/types';

interface Props {
    onLeave: () => void,
}

interface State {
    elements: { [id: string]: type_button_info },
    map: string,
    members: string[],
    isOwner: boolean,
    name: string,
}

export class LobbyMenu extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const name = "New Lobby";
        this.state = { elements: {}, map: "", members: [], isOwner: false, name: name };
        this.updateMapSet = this.updateMapSet.bind(this);

        this.handleMapChange = this.handleMapChange.bind(this);
        this.updateLobby = this.updateLobby.bind(this);
        this.onLeaveClick = this.onLeaveClick.bind(this);
        this.submitName = this.submitName.bind(this);

        this.updateMapSet();

        globals.socket.emit("setLobbyName", name);
        globals.socket.on("updateLobby", this.updateLobby);
    }

    updateLobby(state: {
        isLeader: boolean,
        map: string,
        name: string,
        players: string[]
    }): void {
        this.setState({
            map: state.map,
            name: state.name,
            members: state.players,
            isOwner: state.isLeader,
        });
    }

    onLeaveClick(): void {
        globals.socket.emit("leaveLobby");
        this.props.onLeave();
    }

    submitName(event): void {
        this.setState({ name: event.target.value });
        this.sendUpdate();
    }

    sendUpdate(): void {
        globals.socket.emit("updateLobby", { map: this.state.name, name: this.state.name });
    }

    async updateMapSet() {
        return await fetch("/index.json")
            .then((resp) => resp.json())
            .then((resp) => {
                const newMaps: { [id: string]: type_button_info } = {};
                let first = "";
                let found = false;
                for (const m in resp) {
                    first = first === "" ? m : first;
                    found = found || this.state.map === m;
                    newMaps[m] = {
                        title: resp[m],
                        img: "/maps/images/" + m + ".png",
                        width: 100,
                        height: 100,
                    }
                }
                if (this.state.map === "" || !found) {
                    this.setState({ map: first });
                }
                this.setState({ elements: newMaps });
            });
    }

    handleMapChange(value: string) {
        this.setState({ map: value });
        this.sendUpdate;
    }


    render() {
        let title;
        if (this.state.isOwner) {
            title = <input
                className={styles["lobby-nameinput"]}
                type="text"
                value={this.state.name}
                onChange={this.submitName}
                placeholder="Lobby Name"
            ></input>;
        } else {
            title = <div className={styles["lobby-nameinput"]}>this.state.name</div>;
        }
        return <div id="lobby" className={styles.lobby}>
            <div id="lobby-main" className={styles["lobby-main"]}>
                <div id="lobby-playerlist" className={styles["lobby-playerlist"]}>
                    <PlayerList players={this.state.members}></PlayerList>
                </div>
                <div id="lobby-settings" className={styles["lobby-settings"]}>
                    <div className={styles["lobby-headerbar"]}>
                        <button
                            className={styles["lobby-leavebutton"]}
                            onClick={this.onLeaveClick}
                        >
                            Back
                        </button>
                        {title}
                    </div>
                    <ButtonPanel
                        canSelect={this.state.isOwner}
                        onChange={this.handleMapChange}
                        default={this.state.map}
                        buttons={this.state.elements}
                        title="Maps"
                    ></ButtonPanel>
                </div>
            </div>
            <div id="lobby-chat" className={styles["lobby-chat"]}>
                <Chat></Chat>
            </div>
        </div>
    }
}
