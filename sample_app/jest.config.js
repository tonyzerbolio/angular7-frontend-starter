module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.json",
    },
  },
  collectCoverageFrom: ["src/**/*.ts"],
  moduleFileExtensions: ["js", "ts"],
  testResultsProcessor: "jest-sonar-reporter",
  testMatch: ["**/*.spec.ts"],
  preset: "ts-jest",
};
