// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  // Добавляем больше настроек для стабильности
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Обработка путей @/...
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(customJestConfig)