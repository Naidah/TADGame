import { Character } from '../character';
import { DecayingProjectileFactory } from '../projectiles/decayingProjectileFactory';
import { Weapon } from './weapon';

export class Flamethrower extends Weapon {
    constructor(player: Character) {
        super(player, {
            maxAmmo: 50,
            cooldownTime: 0.03,
            reloadTime: 1,
            minSpread: Math.PI / 5,
            maxSpread: Math.PI / 5,
            spreadRecovery: 0,
            spreadGrowth: 0,
            projFactory: new DecayingProjectileFactory(400, 5, 0.2, 3),
            shots: 3,
        });
    }
}
