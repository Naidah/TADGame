import { Weapon } from './weapon';
import { Character } from '../character';

export class Pistol extends Weapon {
    constructor(player: Character) {
        super(player, {
            maxAmmo: 6,
            cooldownTime: 0,
            reloadTime: 3,
            minSpread: 0,
            maxSpread: Math.PI / 8,
            spreadRecovery: 0.8,
            spreadGrowth: 3,
            isPress: true,
        });
    }
}