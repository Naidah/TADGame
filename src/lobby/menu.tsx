import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './components/styles/menu.css'

import { Lobby } from './components/lobby';
import { Loadout } from './components/loadout';

ReactDOM.render(<div className={styles.menu}>
    <div className={styles["menu-lobby"]}>
        <Lobby></Lobby>
    </div>
    <div className={styles["menu-loadout"]}>
        <Loadout></Loadout>
    </div>
</div>, document.getElementById("root"));