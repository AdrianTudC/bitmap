/** @module Pixel */
export default class Pixel {
    private x: number;
    private y: number;
    private value: number;
    private minDistanceToNextWhitePixel: number;

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
     * Sets the minimal distance between this pixel and the next white pixel.
     * @method
     * @param {number} distance - The distance to be set.
     */
    setDistanceToNextWhitePixel(distance: number): void {
        this.minDistanceToNextWhitePixel = distance;
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
     * Gets the distance to the nearest white pixel
     * @method
     * @returns {number} the distance to the nearest white pixel
     */
    getDistance(): number {
        return this.minDistanceToNextWhitePixel;
    }

    /**
     * Prints the pixel value to stdout
     * @method
     */
    printValue(): void {
        process.stdout.write(`${this.value}`);
    }

    /**
     * Prints the minimal distance to a white pixel to stdout
     * @method
     */
    printDistance(): void {
        process.stdout.write(`${this.minDistanceToNextWhitePixel}`);
    }
}
