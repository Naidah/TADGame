export abstract class Hitbox {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x
    }

    get y(): number {
        return this._y;
    }

    // Absolute position update
    updatePos(x = 0, y = 0): void {
        this._x = x;
        this._y = y;
    }
    // Relative position update
    move(dx = 0, dy = 0): void {
        this._x += dx;
        this._y += dy;
    }

    // Test if the passed hitbox will collide if it moves by the given velocity
    testMovement(hitbox: Hitbox, dx: number, dy: number): boolean {
        hitbox.move(dx, dy);
        const result = this.hasCollision(hitbox);
        hitbox.move(-dx, -dy);
        return result;
    }

    // Checks if a collisions occurs
    abstract hasCollision(hitbox: Hitbox): boolean;
    abstract containsPoint(x: number, y: number): boolean;

    // check if the hitbox is out of the map
    abstract isOutOfBounds(dx: number, dy: number, fullyContained: boolean): boolean;
}
