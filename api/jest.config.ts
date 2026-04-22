import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';

// Base preset for TypeScript + ESM support
const presetConfig = createDefaultEsmPreset({});

export default {
  // Include default ts-jest ESM settings
  ...presetConfig,

  // Run tests in Node.js environment (no browser APIs)
  testEnvironment: 'node',

  // Where Jest should look for test files
  testMatch: [
    '**/tests/**/*.test.ts', // tests folder
    '**/__tests__/**/*.test.ts', // common Jest convention
    '**/?(*.)+(spec|test).ts', // any .test.ts or .spec.ts file
  ],

  // Helps Jest resolve imports that end with .js in TS/ESM projects
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  // Max time a test is allowed to run before failing (30s)
  testTimeout: 30000,
} satisfies Config;
