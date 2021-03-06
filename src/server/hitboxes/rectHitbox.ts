import { CircleHitbox } from './circleHitbox';
import { Hitbox } from './hitbox';
import { getGame } from '../game'

export class RectHitbox extends Hitbox {
    private _w: number;
    private _h: number;

    constructor(x: number, y: number, w: number, h: number) {
        super(x, y);
        this._w = w;
        this._h = h;
    }

    // Selects the collision function based on hitbox type
    hasCollision(hitbox: Hitbox): boolean {
        if (hitbox instanceof RectHitbox) {
            return this.rectOnRect(hitbox);
        }
        
        return this.circleOnRect(hitbox as CircleHitbox);
        
    }

    containsPoint(x: number, y: number) {
        this._ptOnRect(x, y);
    }

    // Collision detection for rectangle on rectangle
    private rectOnRect(hitbox: RectHitbox): boolean {
        // Checks if the left side of one rect is to the right of the right side of the other and
        // if the right side of the first rect is to the left of the left side of the other
        if (!(this.x > hitbox.x + hitbox._w || this.x + this._w < hitbox.x)) {
            // Does the previous check but for top and bottom side
            if (this.y > hitbox.y + hitbox._h || this.y + this._h < hitbox.y) {
                return false;
            }
            
            return true;
            
        }
        
        return false;
        
    }

    // Collision detection for circle on rectangle
    private circleOnRect(hitbox: CircleHitbox): boolean {
        // Checks if the centre of the circle is inside a rectangle with its width extended by its radius in both
        // direction or its height extended by its radius in both direction or if the corners of the original rect
        // is inside the circle
        return this._ptOnRect(
            hitbox.x, hitbox.y, this.x - hitbox.r, this.y, this._w + 2 * hitbox.r, this._h
        ) ||
            this._ptOnRect(
                hitbox.x, hitbox.y, this.x, this.y - hitbox.r, this._w, this._h + 2 * hitbox.r
            ) ||
            hitbox.containsPoint(this.x, this.y) ||
            hitbox.containsPoint(this.x + this._w, this.y) ||
            hitbox.containsPoint(this.x, this.y + this._h) ||
            hitbox.containsPoint(this.x + this._w, this.y + this._h);
    }

    // Checks if a point exists inside the rectangle
    private _ptOnRect(px: number, py: number, rx = 0, ry = 0, w = 0, h = 0): boolean {
        return rx <= px && px <= rx + w && ry <= py && py <= ry + h;
    }

    isOutOfBounds(dx = 0, dy = 0, fullyContained = false): boolean {
        const g = getGame();
        const bx = (fullyContained ? this._w : 0) + dx;
        const by = (fullyContained ? this._h : 0) + dx;
        const bw = fullyContained ? g.width - 2 * this._w : g.width;
        const bh = fullyContained ? g.height - 2 * this._h : g.height;
        return !this.hasCollision(new RectHitbox(bx, by, bw, bh));
    }
}
