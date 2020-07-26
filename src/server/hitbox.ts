export abstract class Hitbox {
    private _x: number;
    private _y: number;

    constructor (x: number, y: number) {
        this._x = x; 
        this._y = y;
    }

    get x () : number {
        return this._x
    }

    get y () : number {
        return this._y;
    }

    // Absolute position update
    updatePos(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    // Relative position update
    move(dx: number, dy: number) {
        this._x += dx;
        this._y += dy;
    }

    // Test if the passed hitbox will collide if it moves by the given velocity
    testMovement (hitbox: Hitbox, dx: number, dy: number) : boolean {
        hitbox.move(dx, dy);
        let result = this.hasCollision(hitbox);
        hitbox.move(-dx, -dy);
        return result;
    }

    // Checks if a collisions occurs
    abstract hasCollision (hitbox: Hitbox) : boolean ; 

}


export class RectHitbox extends Hitbox {
    private _w: number;
    private _h: number;

    constructor (x: number, y: number, w: number, h:number, isStatic: boolean = true) {
        super(x, y);
        this._w = w; 
        this._h = h; 
    }

    // Selects the collision function based on hitbox type
    hasCollision (hitbox: Hitbox) : boolean {
        if (hitbox instanceof RectHitbox) {
            return this.rectOnRect(hitbox);
        }
        else {
            return this.circleOnRect(hitbox as CircleHitbox);
        }
    }

    // Collision detection for rectangle on rectangle
    rectOnRect(hitbox: RectHitbox) : boolean {
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
    circleOnRect(hitbox: CircleHitbox) : boolean {
        // Checks if the centre of the circle is inside a rectangle with its width extended by its radius in both
        // direction or its height extended by its radius in both direction or if the corners of the original rect
        // is inside the circle
        return this._ptOnRect(hitbox.x, hitbox.y, this.x - hitbox.r, this.y, this._w + (2*hitbox.r), this._h) || 
        this._ptOnRect(hitbox.x, hitbox.y, this.x, this.y - hitbox.r, this._w, this._h + (2*hitbox.r)) ||
        hitbox._ptOnCircle(this.x, this.y) ||
        hitbox._ptOnCircle(this.x + this._w, this.y) ||
        hitbox._ptOnCircle(this.x, this.y + this._h) ||
        hitbox._ptOnCircle(this.x + this._w, this.y + this._h);
    }

    // Checks if a point exists inside the rectangle
    _ptOnRect(px: number, py: number, rx: number, ry: number, w: number, h: number) : boolean {
        return rx <= px && px <= rx + w && ry <= py && py <= ry + h;
    }
}


export class CircleHitbox extends Hitbox {
    private _r: number;

    constructor (x: number, y: number, r: number) {
        super(x, y);
        this._r = r;
    }

    get r () : number {
        return this._r;
    }

    // Selects the collision function based on hitbox type
    hasCollision (hitbox: Hitbox) : boolean {
        if (hitbox instanceof CircleHitbox) {
            return this.circleOnCircle(hitbox);
        }
        else {
            return (hitbox as RectHitbox).circleOnRect(this);
        }
    }

    // Collidion detection for circle on circle
    circleOnCircle(hitbox: CircleHitbox) : boolean {
       return this._circleOnCircle(this.x, this.y, this.r, hitbox.x, hitbox.y, hitbox.r); 
    }

    // Collision dtection for point on circle
    _ptOnCircle(px: number, py: number) : boolean {
        return this._circleOnCircle(this.x, this.y, this.r, px, py, 0);
    }

    // Helper function for circle on circle with all necessary values as a parameter
    _circleOnCircle(x1: number, y1: number, r1: number, x2: number, y2: number, r2: number) : boolean {
        let dx = Math.abs(x1 - x2);
        let dy = Math.abs(y1 - y2);
        let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        return distance <= r1 + r2;
 
    }

}