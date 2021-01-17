import Pixel from './pixel';

export default class Bitmap {
    private height: number;
    private width: number;
    private whitePixels: Pixel[];
    private matrix: Pixel[][];

    constructor(values: number[][]) {
        if (!values.map((row) => row.length).every((l) => l === values[0].length)) {
            throw new BitmapError('Matrix width is not consistent across rows');
        }
        this.height = values.length;
        this.width = values[0].length;
        this.matrix = [];
        this.whitePixels = [];

        for (let row = 0; row < this.height; row++) {
            const pixelArray: Pixel[] = [];
            for (let column = 0; column < this.width; column++) {
                if (![0, 1].includes(values[row][column])) {
                    throw new BitmapError('Given matrix contains a value different than 1 or 0');
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

    printBitmap(): void {
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                this.matrix[row][column].printValue();
            }
            process.stdout.write('\n');
        }
    }
}

class BitmapError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
