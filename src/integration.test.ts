import Bitmap from './models/bitmap/bitmap';
import MatrixReader from './parser/parser';

const config = {
    MIN_TEST_CASE_COUNT: 1,
    MAX_TEST_CASE_COUNT: 1000,
    MIN_MATRIX_SIZE: 1,
    MAX_MATRIX_SIZE: 182,
    ALLOWED_MATRIX_VALUES: [0, 1],
};

describe('Parser and Bitmap integration', () => {
    it(`should give the same result for both algorithms`, async () => {
        const matrixReader = new MatrixReader(config, 'data/baseCase');
        const matrixArray = await matrixReader.read();
        matrixArray.forEach((matrix) => {
            const bfsBitmap = new Bitmap(matrix);
            const naiveBitmap = new Bitmap(matrix);

            bfsBitmap.computeDistanceMatrix();
            const distanceBFS = bfsBitmap.getDistanceMatrix();

            naiveBitmap.computeDistanceMatrixNaive();
            const distanceNaive = naiveBitmap.getDistanceMatrix();

            expect(distanceBFS).toStrictEqual(distanceNaive);
        });
    });
});
