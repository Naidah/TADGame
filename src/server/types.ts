export type type_entity = {
    x: number,
    y: number,
    direction: number
};

export type type_player = type_entity & { id: number };

export type type_projectile = type_entity;

export type type_wall = {
    x: number,
    y: number,
    w: number,
    h: number
};

export type type_state = {
    players: {
        [id: number]: type_player
    },
    projectiles: type_projectile[],
    walls: type_wall[]
};

export type type_input = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    mx: number,
    my: number,
    mdown: boolean,
    mpress: boolean
};

export type type_input_set = {
    [socketid: number]: {
        id: number,
        input: type_input
    };
}

export type type_map = {
    settings: {
        name: string,
        size: {
            width: number,
            height: number
        }
    },
    walls: type_wall[];
}


export type type_button_info = {
    title?: string,
    img?: string,
    width: number,
    height: number
}
