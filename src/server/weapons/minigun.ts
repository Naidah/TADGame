import { Weapon } from './weapon';
import { Character } from '../character';
import { ProjectileFactory } from '../projectiles/projectileFactory';

export class Minigun extends Weapon {
    constructor(player: Character) {
        super(player, {
            maxAmmo: 20,
            cooldownTime: 0.11,
            reloadTime: 4.5,
            minSpread: Math.PI / 5,
            maxSpread: Math.PI / 5,
            spreadRecovery: 0,
            spreadGrowth: 0,
            projFactory: new ProjectileFactory(420, 5)
        });
    }
}