import { Character } from '../character';
import { DecayingProjectileFactory } from '../projectiles/decayingProjectileFactory';
import { Weapon } from './weapon';

export class Shotgun extends Weapon {
    constructor(player: Character) {
        super(player, {
            maxAmmo: 4,
            cooldownTime: 0.75,
            reloadTime: 2.5,
            minSpread: Math.PI / 5,
            maxSpread: Math.PI / 5,
            spreadRecovery: 0,
            spreadGrowth: 0,
            projFactory: new DecayingProjectileFactory(420, 30, 0.45, 1.2),
            isPress: true,
            shots: 8,
        });
    }
}
