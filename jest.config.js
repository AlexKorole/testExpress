process.env.NODE_ENV = 'UNITTEST';
module.exports = {
    clearMocks: true,
    collectCoverage: false,
    collectCoverageFrom: [
        './src/**/*.ts'
    ],
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    preset: 'ts-jest'
};
