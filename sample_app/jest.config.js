module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "./src/tsconfig.spec.json",
      stringifyContentPathRegex: '\\.html$',
      astTransformers: [require.resolve('jest-preset-angular/InlineHtmlStripStylesTransformer')],
    },
  },
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["js", "ts", "html", "json"],
  testResultsProcessor: "jest-sonar-reporter",
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./setupJest.ts"],
  testURL: "http://localhost:4200",
  verbose: true
};

