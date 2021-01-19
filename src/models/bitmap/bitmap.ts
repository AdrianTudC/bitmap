import { ALLOWED_MATRIX_VALUES } from '../../config';
import Pixel from '../pixel/pixel';

import * as BitmapErrors from './bitmapErrors';

/** @module Bitmap */
export default class Bitmap {
    private height: number;
    private width: number;
    private whitePixels: Pixel[];
    private matrix: Pixel[][];
    private distanceMatrix: number[][];

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
    }

    /**
     * Computes distances to the closest white pixel for all pixels using the naive method.
     * @method
     */
    computeDistanceMatrixNaive(): void {
        this.distanceMatrix = new Array(this.height);
        for (let i = 0; i < this.distanceMatrix.length; i++) {
            this.distanceMatrix[i] = new Array(this.width);
        }

        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                const currentPixel = this.matrix[row][column];
                if (currentPixel.isWhite()) {
                    this.distanceMatrix[row][column] = 0;
                } else {
                    const distances = this.whitePixels.map((whitePixel) => currentPixel.getDistanceTo(whitePixel));
                    const minDistance = Math.min.apply(Math, distances);
                    this.distanceMatrix[row][column] = minDistance;
                }
            }
        }
    }

    /**
     * Computes distances to the closest white pixel for all pixels using BFS algorithm.
     * @method
     */
    computeDistanceMatrix() {
        this.clearVisited();

        const visitNeighbour = (row: number, column: number): void => {
            if (row >= 0 && row < this.height && column >= 0 && column < this.width) {
                if (!this.matrix[row][column].isWhite() && !this.matrix[row][column].isVisited()) {
                    queue.push(this.matrix[row][column]);
                    this.matrix[row][column].setVisited(true);
                }
            }
        };

        this.distanceMatrix = new Array(this.height);
        for (let i = 0; i < this.distanceMatrix.length; i++) {
            this.distanceMatrix[i] = new Array(this.width);
            for (let j = 0; j < this.distanceMatrix[i].length; j++) {
                this.distanceMatrix[i][j] = 0;
            }
        }

        let minDistance = 0;

        const queue = this.whitePixels.slice();

        while (queue.length !== 0) {
            const queueSize = queue.length;

            for (let i = 0; i < queueSize; i++) {
                const currentPixel = queue.shift();
                this.distanceMatrix[currentPixel.getX()][currentPixel.getY()] = minDistance;
                // left neighbour
                visitNeighbour(currentPixel.getX(), currentPixel.getY() - 1);
                // right neighbour
                visitNeighbour(currentPixel.getX(), currentPixel.getY() + 1);
                // top neighbour
                visitNeighbour(currentPixel.getX() - 1, currentPixel.getY());
                // bottom neighbour
                visitNeighbour(currentPixel.getX() + 1, currentPixel.getY());
            }

            minDistance++;
        }
    }

    /**
     * Gets the distance matrix
     * @method
     * @returns {number[][]} the distance matrix
     */
    getDistanceMatrix(): number[][] {
        return this.distanceMatrix;
    }

    /**
     * Sets all pixels as not visited by the BFS algorithm
     * @method
     */
    private clearVisited(): void {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                this.matrix[row][column].setVisited(false);
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
                process.stdout.write(`${this.distanceMatrix[row][column]}`);
                if (column < this.width - 1) {
                    process.stdout.write(' ');
                }
            }
            process.stdout.write('\n');
        }
        process.stdout.write('\n');
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
        process.stdout.write('\n');
    }
}
