/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  maxWorkers: "50%",
  setupFiles: ["./jest.setup.js"],
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@infra/(.*)$": "<rootDir>/src/infra/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
  },
};
