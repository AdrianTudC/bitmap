import { ALLOWED_MATRIX_VALUES } from '../../config';
import Pixel from '../pixel/pixel';

import * as BitmapErrors from './bitmapErrors';

/** @module Bitmap */
export default class Bitmap {
    private height: number;
    private width: number;
    private whitePixels: Pixel[];
    private matrix: Pixel[][];

    /**
     * Represents a bitmap made of Pixels
     * @constructor
     * @param {number[][]} values - a matrix of numeric values
     */
    constructor(values: number[][]) {
        if (!values.map((row) => row.length).every((l) => l === values[0].length)) {
            throw new BitmapErrors.BitmapRowError();
        }
        this.height = values.length;
        this.width = values[0].length;
        this.matrix = [];
        this.whitePixels = [];

        for (let row = 0; row < this.height; row++) {
            const pixelArray: Pixel[] = [];
            for (let column = 0; column < this.width; column++) {
                if (!ALLOWED_MATRIX_VALUES.includes(values[row][column])) {
                    throw new BitmapErrors.BitmapValueError();
                }
                const pixel = new Pixel(row, column, values[row][column]);
                pixelArray.push(pixel);
                if (values[row][column] === 1) {
                    this.whitePixels.push(pixel);
                }
            }
            this.matrix.push(pixelArray);
        }

        this.computePixelDistances();
    }

    /**
     * Computes distances to the closest white pixel for all pixels.
     * @method
     */
    private computePixelDistances(): void {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                const currentPixel = this.matrix[row][column];
                if (currentPixel.isWhite()) {
                    currentPixel.setDistanceToNextWhitePixel(0);
                } else {
                    const distances = this.whitePixels.map((whitePixel) => currentPixel.getDistanceTo(whitePixel));
                    const minDistance = Math.min.apply(Math, distances);
                    currentPixel.setDistanceToNextWhitePixel(minDistance);
                }
            }
        }
    }

    /**
     * Prints a matrix of distances where A[i][j] is the distance from the
     * A[i][j] pixel to the closest white pixel with a whitespace in-between
     * values on the same row
     * @method
     */
    printDistanceMatrix(): void {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                this.matrix[row][column].printDistance();
                if (column < this.width - 1) {
                    process.stdout.write(' ');
                }
            }
            process.stdout.write('\n');
        }
    }

    /**
     * Prints the bitmap
     * @method
     */
    printBitmap(): void {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                this.matrix[row][column].printValue();
            }
            process.stdout.write('\n');
        }
    }
}
