import { InitialOptionsTsJest } from 'ts-jest/dist/types'

const options: InitialOptionsTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: "<rootDir>/test/globalSetup.ts",
  globalTeardown: "<rootDir>/test/globalTeardown.ts",
  maxWorkers: 1
}

export default options