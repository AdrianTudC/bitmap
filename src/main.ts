import { MatrixReader } from './parser';

const main = async () => {
    let filePath: string | null = null;
    if (process.argv[2] === '-f') {
        if (process.argv[3]) {
            filePath = process.argv[3];
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
        matrixReader.matrixArray.forEach((m) => console.log(m));
    } catch (err) {
        console.log(err.message);
    }
};

main();
