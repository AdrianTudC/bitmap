import * as fs from 'fs';
import * as readline from 'readline';

import * as MatrixReaderErrors from './parserErrors';
import { matrixAllZeros } from './utils';

type config = {
    MIN_TEST_CASE_COUNT: number;
    MAX_TEST_CASE_COUNT: number;
    MIN_MATRIX_SIZE: number;
    MAX_MATRIX_SIZE: number;
    ALLOWED_MATRIX_VALUES: number[];
};

/**
 * @typedef {Object} MatrixSize
 * @property {number} height - Number of rows in the matrix
 * @property {number} width - Number of columns in the matrix
 */

/** @module MatrixReader */
export default class MatrixReader {
    private readInterface: readline.Interface;
    private config: config;

    /**
     * Represents a parser that reads input from stdin or file
     * and outputs a matrix
     * @constructor
     * @param {number[][]} values - a matrix of numbers
     */
    constructor(config: config, filePath?: string) {
        if (filePath) {
            this.readInterface = readline.createInterface(fs.createReadStream(filePath));
        } else {
            this.readInterface = readline.createInterface(process.stdin);
        }
        this.config = config;
    }

    /**
     * Parses the number of matrixes that will be read from the input stream
     * @method
     * @param {string} line - current line
     * @return {number} - the amount of matrixes to be read
     */
    private parseTestCasesCount(line: string): number {
        const testCasesCount = parseInt(line);
        if (Number.isNaN(testCasesCount)) {
            throw new MatrixReaderErrors.NaN();
        }
        if (testCasesCount < this.config.MIN_TEST_CASE_COUNT || testCasesCount > this.config.MAX_TEST_CASE_COUNT) {
            throw new MatrixReaderErrors.CaseOob();
        }
        return testCasesCount;
    }

    /**
     * Parses height followed by the width of the current matrix
     * separated by a whitespace
     * @method
     * @param {string} line - current line
     * @return {MatrixSize} - The size of the matrix to be read
     */
    private parseMatrixSize(line: string): { height: number; width: number } {
        const matrixSize = line.split(' ');
        if (matrixSize.length > 2) {
            throw new MatrixReaderErrors.InvalidMatrixSizes();
        }
        const height = parseInt(matrixSize[0]);
        const width = parseInt(matrixSize[1]);
        if (Number.isNaN(height) || Number.isNaN(width)) {
            throw new MatrixReaderErrors.NaN();
        }
        if (
            height < this.config.MIN_MATRIX_SIZE ||
            height > this.config.MAX_MATRIX_SIZE ||
            width < this.config.MIN_MATRIX_SIZE ||
            width > this.config.MAX_MATRIX_SIZE
        ) {
            throw new MatrixReaderErrors.MatrixSizeOob();
        }
        return { height, width };
    }

    /**
     * Parses a row of values from the current matrix
     * @method
     * @param {string} line - current line
     * @return {number[]} - A row of values in the current matrix
     */
    private parseMatrixRowValues(line: string): number[] {
        if (
            line
                .split('')
                .map((value) => !this.config.ALLOWED_MATRIX_VALUES.includes(parseInt(value)))
                .reduce((sum, value) => sum || value, false)
        ) {
            throw new MatrixReaderErrors.InvalidMatrixValue();
        }
        return line.split('').map((value) => parseInt(value));
    }

    /**
     * Consumes input from the read interface and turns it into an
     * array of matrix
     * @method
     * @return {Promise<number[][][]>} - A promise that returns an array
     * of matrix with numerical values
     */
    async read(): Promise<number[][][]> {
        const matrixArray: number[][][] = [];
        let testCasesCount = 0;
        let matrixLinesRead = 0;
        let currentMatrixHeight = 0;
        let currentMatrixWidth = 0;
        let currentMatrix: number[][] = [];

        try {
            for await (const line of this.readInterface) {
                if (testCasesCount === 0) {
                    testCasesCount = this.parseTestCasesCount(line);
                } else if (currentMatrixHeight === 0 && currentMatrixWidth === 0) {
                    const matrixSize = this.parseMatrixSize(line);
                    currentMatrixHeight = matrixSize.height;
                    currentMatrixWidth = matrixSize.width;
                } else if (matrixLinesRead < currentMatrixHeight) {
                    matrixLinesRead++;
                    if (line.length !== currentMatrixWidth) {
                        throw new MatrixReaderErrors.InvalidMatrixLine();
                    }
                    currentMatrix[matrixLinesRead - 1] = this.parseMatrixRowValues(line);
                } else if (matrixLinesRead === currentMatrixHeight) {
                    if (matrixAllZeros(currentMatrix)) {
                        throw new MatrixReaderErrors.EmptyMatrix();
                    }
                    matrixArray.push(currentMatrix);
                    matrixLinesRead = 0;
                    currentMatrixHeight = 0;
                    currentMatrixWidth = 0;
                    currentMatrix = [];
                }

                if (matrixArray.length === testCasesCount) {
                    break;
                }
            }

            return matrixArray;
        } catch (err) {
            if (err instanceof MatrixReaderErrors.BaseMatrixReaderError) {
                throw err;
            }
            throw new Error('Incorrect input format');
        }
    }
}
