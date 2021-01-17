import * as CONFIG from '../config';

export class BaseMatrixReaderError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NaN extends BaseMatrixReaderError {
    constructor() {
        super('Input value is not a number');
    }
}

export class CaseOob extends BaseMatrixReaderError {
    constructor() {
        super(
            `The number of cases needs to be between ${CONFIG.MIN_TEST_CASE_COUNT} and ${CONFIG.MAX_TEST_CASE_COUNT}`,
        );
    }
}

export class MatrixSizeOob extends BaseMatrixReaderError {
    constructor() {
        super(`Matrix height & width values must be between ${CONFIG.MIN_MATRIX_SIZE} and ${CONFIG.MAX_MATRIX_SIZE}`);
    }
}

export class InvalidMatrixValue extends BaseMatrixReaderError {
    constructor() {
        super(`One of the given matrix values is not in ${CONFIG.MATRIX_VALUES}`);
    }
}

export class InvalidMatrixLine extends BaseMatrixReaderError {
    constructor() {
        super('Incorrect number of items per line');
    }
}

export class EmptyMatrix extends BaseMatrixReaderError {
    constructor() {
        super('Matrix has all values 0');
    }
}
