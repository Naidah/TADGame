import { Weapon } from './weapon';
import { Character } from '../character';

export class Rifle extends Weapon {
    constructor(player: Character) {
        super(player, {
            maxAmmo: 10,
            cooldownTime: 0.18,
            reloadTime: 1.5,
            minSpread: Math.PI / 30,
            maxSpread: Math.PI / 8,
            spreadRecovery: 0.8,
            spreadGrowth: 3,
        });
    }
}
