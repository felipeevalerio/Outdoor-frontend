/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/hooks/**', 'src/utils/**'],
    environment: 'jsdom',
    coverage: {
        include: ['src/hooks/**', 'src/utils/**'],
        reporter: ['lcov', "html"],
        all: true,
        provider: 'c8',
    },
  },
})