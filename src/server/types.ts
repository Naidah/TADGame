import { ProjectileFactory } from "./projectiles/projectileFactory";

export interface type_entity {
    x: number,
    y: number,
    direction: number
}

export interface type_player extends type_entity {
    id: number,
    hp: number,
    isAlive: boolean,
    ammo: number,
    maxAmmo: number
}

export type type_projectile = type_entity;

export interface type_wall {
    x: number,
    y: number,
    w: number,
    h: number
}

export interface type_state {
    players: {
        [id: number]: type_player
    },
    projectiles: type_projectile[],
    walls: type_wall[]
}

export interface type_input {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    mx: number,
    my: number,
    mdown: boolean,
    mpress: boolean
}

export interface type_input_set {
    [socketid: number]: {
        id: number,
        input: type_input
    };
}

export interface type_map {
    settings: {
        name: string,
        size: {
            width: number,
            height: number
        }
    },
    walls: type_wall[];
}

export interface type_button_info {
    title?: string,
    img?: string,
    width: number,
    height: number
}

export interface type_loadout {
    weapon: string,
    ability: string,
    perk: string,
}

export interface type_weapon_args {
    maxAmmo?: number,
    cooldownTime?: number,
    reloadTime?: number,
    minSpread?: number,
    maxSpread?: number,
    spreadRecovery?: number,
    spreadGrowth?: number,
    projFactory?: ProjectileFactory,
    isPress?: boolean,
    shots?: number
}
