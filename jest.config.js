/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
    automock: false,
    collectCoverage: true,
    collectCoverageFrom: ['src/lib/rng/**/*'],
    coveragePathIgnorePatterns: ['node_modules', 'test', 'doc.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    cacheDirectory: '.jest-cache',
    testPathIgnorePatterns: ['/es6/', '/commonjs/'],
    //testMatch: ['**/__tests__/**/*.[t]s?(x)', '**/?(*.)+(spec|test).[t]s?(x)'],
    testRegex: '/__test__/test.ts$',
    globals: {
        'ts-jest': {
            compiler: 'typescript',
            tsconfig: 'tsconfig-jest.json',
            diagnostics: {
                ignoreCodes: [151001],
            },
        },
    },
    moduleNameMapper: {
        '^\\$jest-extension$': '<rootDir>/src/packages/jest-extension.ts',
    },
};