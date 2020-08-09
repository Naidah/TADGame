import * as React from 'react';
import * as styles from './styles/loadout.css';
import { ButtonPanel } from './ButtonPanel';
import { type_button_info } from '../../server/types';

export class Loadout extends React.Component<{}, { name: string, loadout: { weapon: string, ability: string, perk: string } }> {
    private static _button_size = 80;
    private static _weapons: { [id: string]: type_button_info } = {
        "pistol": {
            width: Loadout._button_size,
            height: Loadout._button_size
        },
        "rifle": {
            width: Loadout._button_size,
            height: Loadout._button_size
        },
        "shotgun": {
            width: Loadout._button_size,
            height: Loadout._button_size
        },
    }
    constructor(props) {
        super(props);

        let username;
        if (localStorage.username) {
            username = localStorage.username;
        } else {
            username = "Username";
            localStorage.username = "Username";
        }

        let weapon;
        let ability;
        let perk;
        if (localStorage.weapon) {
            weapon = localStorage.weapon;
        } else {
            weapon = "pistol"
            localStorage.weapon = weapon;
        }

        if (localStorage.ability) {
            ability = localStorage.ability;
        } else {
            ability = ""
            localStorage.ability = ability;
        }

        if (localStorage.perk) {
            perk = localStorage.perk;
        } else {
            perk = ""
            localStorage.perk = perk;
        }

        let loadout = { weapon, ability, perk };

        this.state = { name: username, loadout: loadout };
        console.log(this.state);

        this.handleWeaponChange = this.handleWeaponChange.bind(this);
        this.handleAbilityChange = this.handleAbilityChange.bind(this);
        this.handlePerkChange = this.handlePerkChange.bind(this);
        this.handleLoadoutChange = this.handleLoadoutChange.bind(this);

        this.submitName = this.submitName.bind(this);
    }

    submitName(event) {
        this.setState({ name: event.target.value });
        localStorage.username = event.target.value;
    }

    handleWeaponChange(value: string) {
        if (this.state.loadout.weapon != value) {
            this.handleLoadoutChange(
                value,
                this.state.loadout.ability,
                this.state.loadout.perk
            );
        }
    }

    handleAbilityChange(value: string) {
        if (this.state.loadout.ability != value) {
            this.handleLoadoutChange(
                this.state.loadout.weapon,
                value,
                this.state.loadout.perk
            );
        }
    }

    handlePerkChange(value: string) {
        if (this.state.loadout.perk != value) {
            this.handleLoadoutChange(
                this.state.loadout.weapon,
                this.state.loadout.ability,
                value
            );
        }
    }

    handleLoadoutChange(
        weapon: string,
        ability: string,
        perk: string
    ) {
        this.setState({ loadout: { weapon: weapon, ability: ability, perk: perk } });
        localStorage.loadout = { weapon: weapon, ability: ability, perk: perk };
        // send to server
    }

    render() {
        return <div id="lobby" className={styles.lobby}>
            <h1>Loadout</h1>
            <input className={styles["loadout-username"]} type="text" value={this.state.name} onChange={this.submitName} placeholder="Username"></input>
            <ButtonPanel title="Weapons" onChange={this.handleWeaponChange} default={this.state.loadout.weapon} buttons={Loadout._weapons} ></ButtonPanel>
            <ButtonPanel title="Abilities" onChange={this.handleAbilityChange} default={this.state.loadout.ability} buttons={{}}></ButtonPanel>
            <ButtonPanel title="Perks" onChange={this.handlePerkChange} default={this.state.loadout.perk} buttons={{}}></ButtonPanel>
        </div>
    }
}