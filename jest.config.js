module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.*.ts$": "babel-jest"
  },
  moduleNameMapper: {
    '^\..*rfh-types$': '<rootDir>/src/rfh-types.d.ts',
  }
};