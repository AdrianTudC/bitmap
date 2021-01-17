import Bitmap from './models/bitmap';
import MatrixReader from './parser';

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
        const matrixReader = new MatrixReader(filePath);
        await matrixReader.read();

        matrixReader.matrixArray.forEach((matrix) => {
            const bitmap = new Bitmap(matrix.values);
            bitmap.printDistanceMatrix();
        });
    } catch (err) {
        console.log(err.message);
    }
};

main();
