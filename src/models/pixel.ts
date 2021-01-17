export default class Pixel {
    private x: number;
    private y: number;
    private value: number;
    private distanceToNextWhitePixel: number;

    constructor(x: number, y: number, value: number) {
        if (![0, 1].includes(value)) {
            throw new PixelError('Pixel value is not 0 or 1');
        }
        this.x = x;
        this.y = y;
        this.value = value;
    }

    setDistanceToNextWhitePixel(distance: number): void {
        this.distanceToNextWhitePixel = distance;
    }

    isWhite(): boolean {
        return this.value === 1;
    }

    getDistanceTo(a: Pixel): number {
        return Math.abs(a.getX() - this.x) + Math.abs(a.getY() - this.y);
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getDistance(): number {
        return this.distanceToNextWhitePixel;
    }

    printValue(): void {
        process.stdout.write(`${this.value}`);
    }

    printDistance(): void {
        process.stdout.write(`${this.distanceToNextWhitePixel}`);
    }
}

class PixelError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
