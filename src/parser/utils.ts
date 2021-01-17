const rowAllZeros = (row: number[]): boolean => {
    return row.filter((v) => v === 0).length === row.length;
};
export const matrixAllZeros = (matrix: number[][]): boolean => {
    return matrix.map(rowAllZeros).reduce((sum, current) => sum && current, true);
};
