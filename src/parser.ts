import * as fs from 'fs';
import * as readline from 'readline';

export type matrix = { height: number; width: number; values: number[][] };

export default class MatrixReader {
    private readInterface: readline.Interface;
    matrixArray: matrix[] = [];

    constructor(filePath?: string) {
        if (filePath) {
            this.readInterface = readline.createInterface(fs.createReadStream(filePath));
        } else {
            this.readInterface = readline.createInterface(process.stdin);
        }
    }

    private parseTestCasesCount(line: string): number {
        const testCasesCount = parseInt(line);
        if (Number.isNaN(testCasesCount)) {
            throw new MatrixReaderError('Input value is not a number');
        }
        if (testCasesCount < 1 || testCasesCount > 1000) {
            throw new MatrixReaderError('The number of cases needs to be between 1 and 1000');
        }
        return testCasesCount;
    }

    private parseMatrixSize(line: string): { height: number; width: number } {
        const matrixSize = line.split(' ');
        const height = parseInt(matrixSize[0]);
        const width = parseInt(matrixSize[1]);
        if (matrixSize.length !== 2 || matrixSize[0].length === 0 || matrixSize[1].length === 0) {
            throw new MatrixReaderError('Incorrect matrix size input');
        }
        if (Number.isNaN(height)) {
            throw new MatrixReaderError('Invalid input for matrix height');
        }
        if (Number.isNaN(width)) {
            throw new MatrixReaderError('Invalid input for matrix width');
        }
        if (height < 1 || height > 182) {
            throw new MatrixReaderError('Matrix height value must be between 1 and 182');
        }
        if (width < 1 || width > 182) {
            throw new MatrixReaderError('Matrix width value must be between 1 and 182');
        }
        return { height, width };
    }

    private parseMatrixRowValues(line: string): number[] {
        if (
            line
                .split('')
                .map((value) => ![0, 1].includes(parseInt(value)))
                .reduce((sum, value) => sum || value, false)
        ) {
            throw new MatrixReaderError('One of the given matrix values is not a 0 or 1');
        }
        return line.split('').map((value) => parseInt(value));
    }

    async read(): Promise<void> {
        let testCasesCount = 0;
        let matrixLinesRead = 0;
        let currentMatrix: matrix = {
            height: 0,
            width: 0,
            values: [[]],
        };

        try {
            for await (const line of this.readInterface) {
                if (testCasesCount === 0) {
                    testCasesCount = this.parseTestCasesCount(line);
                } else if (currentMatrix.height === 0 && currentMatrix.width === 0) {
                    const matrixSize = this.parseMatrixSize(line);
                    currentMatrix = { ...currentMatrix, ...matrixSize };
                } else if (matrixLinesRead < currentMatrix.height) {
                    matrixLinesRead++;
                    if (line.length !== currentMatrix.width) {
                        throw new MatrixReaderError('Incorrect number of items per line');
                    }
                    currentMatrix.values[matrixLinesRead - 1] = this.parseMatrixRowValues(line);
                } else if (matrixLinesRead === currentMatrix.height) {
                    this.matrixArray.push(currentMatrix);
                    matrixLinesRead = 0;
                    currentMatrix = {
                        height: 0,
                        width: 0,
                        values: [[]],
                    };
                }

                if (this.matrixArray.length === testCasesCount) {
                    break;
                }
            }
        } catch (err) {
            if (err instanceof MatrixReaderError) {
                throw err;
            }
            throw new Error('Incorrect input format');
        }
    }
}

class MatrixReaderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
