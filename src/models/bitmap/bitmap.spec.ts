import Bitmap from './bitmap';
import * as BitmapErrors from './bitmapErrors';

describe('Bitmap', () => {
    it('should not accept rows of different sizes', () => {
        try {
            const bitmap = new Bitmap([
                [0, 1],
                [0, 1, 1],
            ]);
            console.log(bitmap); // do something with bitmap
        } catch (e) {
            const errorType = e instanceof BitmapErrors.BitmapRowError;
            expect(errorType).toBe(true);
        }
    });

    it(`should not accept values other than 0 and 1`, () => {
        try {
            const bitmap = new Bitmap([
                [0, 1, 2],
                [0, 1, 1],
            ]);
            console.log(bitmap); // do something with bitmap
        } catch (e) {
            const errorType = e instanceof BitmapErrors.BitmapValueError;
            expect(errorType).toBe(true);
        }
    });

    it(`should run the base case`, () => {
        const bitmap = new Bitmap([
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
        ]);
        bitmap.printDistanceMatrix();
    });
});
