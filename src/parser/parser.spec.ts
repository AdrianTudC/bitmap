import MatrixReader from './parser';
import * as MatrixReaderErrors from './parserErrors';
import { matrixAllZeros } from './utils';

const config = {
    MIN_TEST_CASE_COUNT: 1,
    MAX_TEST_CASE_COUNT: 1000,
    MIN_MATRIX_SIZE: 1,
    MAX_MATRIX_SIZE: 182,
    MATRIX_VALUES: [0, 1],
};

describe('Bitmap', () => {
    it('should not accept empty input', async () => {
        try {
            const matrixReader = new MatrixReader(config, 'data/empty');
            await matrixReader.read();
        } catch (e) {
            const errorType = e instanceof MatrixReaderErrors.NaN;
            expect(errorType).toBe(true);
        }
    });

    it('should not accept too many test cases', async () => {
        try {
            const matrixReader = new MatrixReader(config, 'data/tooManyCases');
            await matrixReader.read();
        } catch (e) {
            const errorType = e instanceof MatrixReaderErrors.CaseOob;
            expect(errorType).toBe(true);
        }
    });

    it('should not accept matrix size outside limits', async () => {
        try {
            const matrixReader = new MatrixReader(config, 'data/lowMatrixLimit');
            await matrixReader.read();
        } catch (e) {
            const errorType = e instanceof MatrixReaderErrors.MatrixSizeOob;
            expect(errorType).toBe(true);
        }
        try {
            const matrixReader = new MatrixReader(config, 'data/highMatrixLimit');
            await matrixReader.read();
        } catch (e) {
            const errorType = e instanceof MatrixReaderErrors.MatrixSizeOob;
            expect(errorType).toBe(true);
        }
    });

    it('should only accept allowed matrix values', async () => {
        try {
            const matrixReader = new MatrixReader(config, 'data/badMatrixValues');
            await matrixReader.read();
        } catch (e) {
            const errorType = e instanceof MatrixReaderErrors.InvalidMatrixValue;
            expect(errorType).toBe(true);
        }
    });

    it('should properly check if matrix is empty', () => {
        const zeroMatrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
        expect(matrixAllZeros(zeroMatrix)).toBe(true);
        const nonZeroMatrix = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 1],
        ];
        expect(matrixAllZeros(nonZeroMatrix)).toBe(false);
    });

    it('should fail if matrix is all zeros', async () => {
        try {
            const matrixReader = new MatrixReader(config, 'data/allZeroMatrix');
            await matrixReader.read();

            expect(matrixReader.matrixArray.map(matrixAllZeros)).toBe(true);
        } catch (e) {
            const errorType = e instanceof MatrixReaderErrors.EmptyMatrix;
            expect(errorType).toBe(true);
        }
    });
});
