import { Hitbox } from './hitbox'
import { RectHitbox } from './rectHitbox'
import { getGame } from '../game'

export class CircleHitbox extends Hitbox {
    private _r: number;

    constructor(x: number, y: number, r: number) {
        super(x, y);
        this._r = r;
    }

    get r(): number {
        return this._r;
    }

    // Selects the collision function based on hitbox type
    hasCollision(hitbox: Hitbox): boolean {
        if (hitbox instanceof CircleHitbox) {
            return this.circleOnCircle(hitbox);
        }
        else {
            return hitbox.hasCollision(this);
        }
    }

    containsPoint(x: number, y: number): boolean {
        return this._ptOnCircle(x, y);
    }

    // Collidion detection for circle on circle
    private circleOnCircle(hitbox: CircleHitbox): boolean {
        return this._circleOnCircle(this.x, this.y, this.r, hitbox.x, hitbox.y, hitbox.r);
    }

    // Collision dtection for point on circle
    private _ptOnCircle(px: number, py: number): boolean {
        return this._circleOnCircle(this.x, this.y, this.r, px, py, 0);
    }

    // Helper function for circle on circle with all necessary values as a parameter
    private _circleOnCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number): boolean {
        let dx = Math.abs(x1 - x2);
        let dy = Math.abs(y1 - y2);
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return distance <= r1 + r2;

    }

    isOutOfBounds(dx: number = 0, dy: number = 0, fullyContained: boolean = false): boolean {
        let g = getGame();
        let d = this._r * 2;
        let bx = (fullyContained ? d : 0) - dx;
        let by = (fullyContained ? d : 0) - dy;
        let bw = fullyContained ? g.width - 2 * d : g.width;
        let bh = fullyContained ? g.height - 2 * d : g.height;
        return this.x + this._r < bx
            || this.x - this._r > bx + bw
            || this.y + this._r < by
            || this.y - this._r > by + bh;
    }
}