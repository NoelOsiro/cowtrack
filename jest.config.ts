import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // ...
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}", // Adjust the paths based on your project structure
    "!src/**/__tests__/**", // Exclude test files
    "!src/app/auth/callback/*", // Exclude auth callbacks
    "!src/utils/supabase/*", // Exclude Supabase
    "!src/types/*", // Exclude types
    "!src/**/*.d.ts", // Exclude TypeScript declaration files
    "!src/**/index.ts" // Exclude index files
  ],
  coverageDirectory: "coverage", // Directory where coverage reports are saved
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)