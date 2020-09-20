import { Character } from '../character';
import { ProjectileFactory } from '../projectiles/projectileFactory';
import { Weapon } from './weapon';


export class Dmr extends Weapon {
    constructor(player: Character) {
        super(player, {
            maxAmmo: 5,
            cooldownTime: 0.65,
            reloadTime: 2,
            minSpread: 0,
            maxSpread: 0,
            spreadRecovery: 0,
            spreadGrowth: 0,
            projFactory: new ProjectileFactory(650, 60),
            isPress: true,
        });
    }
}
