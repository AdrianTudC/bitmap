module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
    coverageReporters: ['lcov', 'text', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    resetMocks: true,
    roots: ['<rootDir>/src'],
};
