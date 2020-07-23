export type type_player = {
    id: number,
    x: number,
    y: number,
    direction: number
}

export type type_projectile = {
    x: number,
    y: number,
    direction: number
}

export type type_wall = {
    x: number,
    y: number,
    w: number,
    h: number
}

export type type_state = {
    players: {
        [id: number]: type_player
    },
    projectiles: {
        [id: number]: type_projectile
    },
    walls: {
        [id: number]: type_wall
    }
}

export type type_input = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    mx: number,
    my: number,
    mdown: boolean,
    mpress: boolean
}

export function clamp(val: number, min: number, max: number): number {
    if (max < min) {
        return clamp(val, max, min);
    }
    return Math.min(max, Math.max(min, val))
}