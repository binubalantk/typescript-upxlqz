module.exports = {
    moduleFileExtensions: [
        'ts',
        'js',
        'tsx'
    ],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'ts-jest'
    },
    transformIgnorePatterns: [],
    collectCoverageFrom: [
        'src/**/*.ts',
        '!**/*.d.ts'
    ],
    collectCoverage: false,
    coverageDirectory: '<rootDir>/reports/coverage',
    coverageReporters: [
        "cobertura",
        "html"
    ],
    testMatch: ['<rootDir>/tests/**/*.spec.[jt]s'],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost/',

    globals: {
        ENV: {
            /* add environments variables here, if needed */
        },
    }
};
