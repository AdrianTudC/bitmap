import Bitmap from './models/bitmap/bitmap';
import MatrixReader from './parser/parser';
import * as CONFIG from './config';

const main = async () => {
    let filePath: string | null = null;
    if (process.argv[2] === '-f') {
        if (process.argv[3]) {
            filePath = process.argv[3];
            console.info(`Reading input from ${filePath}`);
        } else {
            console.error('Missing file path');
            process.exit(1);
        }
    } else {
        console.info('Starting in stdin mode...');
        console.info('Provide manual input:');
    }

    try {
        const matrixReader = new MatrixReader(CONFIG, filePath);
        const matrixArray = await matrixReader.read();
        matrixArray.forEach((matrix) => {
            const bitmap = new Bitmap(matrix);
            // this is fast
            bitmap.computeDistanceMatrix();
            bitmap.printDistanceMatrix();
            // can retrieve distance matrix like this
            // console.log(bitmap.getDistanceMatrix());

            // this is slower
            // bitmap.computeDistanceMatrixNaive();
            // bitmap.printDistanceMatrix();
        });
    } catch (err) {
        console.error(err.message);
    }
};

main();
