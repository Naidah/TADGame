import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './components/styles/menu.css'

import { Loadout } from './components/loadout';
import { LobbyList } from './components/lobbylist';
import { LobbyMenu } from './components/lobbyMenu';

class Menu extends React.Component<Record<string, unknown>, { lobby: number }> {
    constructor(props) {
        super(props);
        this.state = { lobby: -1 };

        this.setLobbyId = this.setLobbyId.bind(this);
    }

    setLobbyId(id: number) {
        this.setState({
            lobby: id,
        });
    }

    render() {
        if (this.state.lobby >= 0) {
            return <div className={styles.menu}>
                <div className={styles["menu-lobby-lobby"]}>
                    <LobbyMenu onLeave={() => this.setLobbyId(-1)}></LobbyMenu>
                </div>
                <div className={styles["menu-lobby-loadout"]}>
                    <Loadout></Loadout>
                </div>
            </div>;
        } 
        return <div className={styles.menu}>
            <div className={styles['menu-home-lobbylist']}>
                <LobbyList onChange={this.setLobbyId}></LobbyList>
            </div>
            <div className={styles["menu-home-loadout"]}>
                <Loadout></Loadout>
            </div>
        </div>
        
    }
}

ReactDOM.render(<Menu></Menu>, document.getElementById("root"));
