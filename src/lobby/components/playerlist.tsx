import * as React from 'react';
import * as styles from './styles/playerlist.css'

interface Props { players: string[] }

export class PlayerList extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        // this.state = { players: ["Bob", "Bill", "The BIG Moot"] }
    }

    render(): JSX.Element {
        return <div id="player-list" className="playerlist">
            <h2>Players</h2>
            <ul className={styles["playerlist-list"]}>
                {this.props.players.map((player, i) => <li key={i}>
                    <div>{player}</div>
                    <div className={styles["playerlist-list-controls"]}>
                        <div className={styles["playerlist-list-readydisp"]}></div>
                    </div>
                </li>)}
            </ul>
        </div>
    }
}
