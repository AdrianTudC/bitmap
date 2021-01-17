import Pixel from './pixel';

describe('Pixel', () => {
    it('should compute pixel distances correctly', () => {
        const pixelA = new Pixel(0, 0, 0);
        const pixelB = new Pixel(2, 2, 1);
        const distance = pixelA.getDistanceTo(pixelB);
        expect(distance).toBe(4);
    });
});
