import { Hitbox } from './hitbox';
import { CircleHitbox } from './circleHitbox';
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
        else {
            return this.circleOnRect(hitbox as CircleHitbox);
        }
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
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }

    // Collision detection for circle on rectangle
    private circleOnRect(hitbox: CircleHitbox): boolean {
        // Checks if the centre of the circle is inside a rectangle with its width extended by its radius in both
        // direction or its height extended by its radius in both direction or if the corners of the original rect
        // is inside the circle
        return this._ptOnRect(hitbox.x, hitbox.y, this.x - hitbox.r, this.y, this._w + (2 * hitbox.r), this._h) ||
            this._ptOnRect(hitbox.x, hitbox.y, this.x, this.y - hitbox.r, this._w, this._h + (2 * hitbox.r)) ||
            hitbox.containsPoint(this.x, this.y) ||
            hitbox.containsPoint(this.x + this._w, this.y) ||
            hitbox.containsPoint(this.x, this.y + this._h) ||
            hitbox.containsPoint(this.x + this._w, this.y + this._h);
    }

    // Checks if a point exists inside the rectangle
    private _ptOnRect(px: number, py: number, rx: number = 0, ry: number = 0, w: number = 0, h: number = 0): boolean {
        return rx <= px && px <= rx + w && ry <= py && py <= ry + h;
    }

    isOutOfBounds(dx: number = 0, dy: number = 0, fullyContained: boolean = false): boolean {
        let g = getGame();
        let bx = (fullyContained ? this._w : 0) + dx;
        let by = (fullyContained ? this._h : 0) + dx;
        let bw = fullyContained ? g.width - 2 * this._w : g.width;
        let bh = fullyContained ? g.height - 2 * this._h : g.height;
        return !this.hasCollision(new RectHitbox(bx, by, bw, bh));
    }
}