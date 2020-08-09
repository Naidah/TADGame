import * as React from 'react';
import * as styles from './styles/playerlist.css'

export class PlayerList extends React.Component<{}, { players: string[] }> {
    constructor(props) {
        super(props);

        this.state = { players: ["Bob", "Bill", "The BIG Moot"] }
    }

    render() {
        return <div id="player-list" className="playerlist">
            <h2>Players</h2>
            <ul className={styles["playerlist-list"]}>
                {this.state.players.map((player, i) => {
                    return <li key={i}>
                        <div>{player}</div>
                        <div className={styles["playerlist-list-controls"]}>
                            <div className={styles["playerlist-list-readydisp"]}></div>
                        </div>
                    </li>
                })}
            </ul>
        </div>
    }
}