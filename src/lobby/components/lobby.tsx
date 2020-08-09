import * as React from 'react';
import { Chat } from './chat';
import { PlayerList } from './playerlist';
import * as styles from './styles/lobby.css';
import { ButtonPanel } from './ButtonPanel';
import { type_button_info } from '../../server/types';

export class Lobby extends React.Component<{}, { elements: { [id: string]: type_button_info }, map: string }> {
    constructor(props) {
        super(props);

        this.state = { elements: {}, map: "" };
        this.updateMapSet = this.updateMapSet.bind(this);

        this.handleMapChange = this.handleMapChange.bind(this);

        this.updateMapSet();
    }

    async updateMapSet() {
        return await fetch("/index.json")
            .then((resp) => resp.json())
            .then((resp) => {
                let newMaps: { [id: string]: type_button_info } = {};
                let first = "";
                let found = false;
                for (let m in resp) {
                    first = first == "" ? m : first;
                    found = found || this.state.map == m;
                    newMaps[m] = {
                        title: resp[m],
                        img: "/maps/images/" + m + ".png",
                        width: 100,
                        height: 100
                    }
                }
                if (this.state.map == "" || !found) {
                    this.setState({ map: first });
                }
                this.setState({ elements: newMaps });
            });
    }

    handleMapChange(value: string) {
        this.setState({ map: value });
    }


    render() {
        return <div id="lobby" className={styles.lobby}>
            <div id="lobby-main" className={styles["lobby-main"]}>
                <div id="lobby-playerlist" className={styles["lobby-playerlist"]}>
                    <PlayerList></PlayerList>
                </div>
                <div id="lobby-settings" className={styles["lobby-settings"]}>
                    <ButtonPanel onChange={this.handleMapChange} default={this.state.map} buttons={this.state.elements} title="Maps"></ButtonPanel>
                </div>
            </div>
            <div id="lobby-chat" className={styles["lobby-chat"]}>
                <Chat></Chat>
            </div>
        </div>
    }
}