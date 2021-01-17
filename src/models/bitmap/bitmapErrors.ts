import { MATRIX_VALUES } from '../../config';

export class BaseBitmapError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BitmapRowError extends BaseBitmapError {
    constructor() {
        super('Matrix width is not consistent across rows');
    }
}

export class BitmapValueError extends BaseBitmapError {
    constructor() {
        super(`Given matrix contains a value not in ${MATRIX_VALUES}`);
    }
}
