/** @module Pixel */
export default class Pixel {
    private x: number;
    private y: number;
    private value: number;
    private visited: boolean = false;

    /**
     * Represents a pixel.
     * @constructor
     * @param {number} x - The x coordinate of the pixel.
     * @param {number} y - The y coordinate of the pixel.
     * @param {number} value - The numeric value of the pixel.
     */
    constructor(x: number, y: number, value: number) {
        this.x = x;
        this.y = y;
        this.value = value;
    }

    /**
     * Marks the pixel as visited
     * @method
     */
    setVisited(v: boolean): void {
        this.visited = v;
    }

    /**
     * Checks if the pixel is white.
     * @method
     * @returns {boolean} true if the pixel is white and false otherwise
     */
    isWhite(): boolean {
        return this.value === 1;
    }

    /**
     * Checks if the pixel has been visited by the BFS algorithm
     * @method
     * @returns {boolean} true if the pixel has been visited
     */
    isVisited(): boolean {
        return this.visited;
    }

    /**
     * Computes distance to another Pixel
     * @method
     * @param {pixel} - Pixel to measure the distance to
     * @returns {number} distance to the given pixel
     */
    getDistanceTo(a: Pixel): number {
        return Math.abs(a.getX() - this.x) + Math.abs(a.getY() - this.y);
    }

    /**
     * Gets the X coordinate of the pixel
     * @method
     * @returns {number} the X coordinate
     */
    getX(): number {
        return this.x;
    }

    /**
     * Gets the Y coordinate of the pixel
     * @method
     * @returns {number} the Y coordinate
     */
    getY(): number {
        return this.y;
    }

    /**
     * Prints the pixel value to stdout
     * @method
     */
    printValue(): void {
        process.stdout.write(`${this.value}`);
    }
}
