/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude:  ['node_modules/**', 'dist/**','src/components/**', 'src/assets/**', 'src/layouts/**', 'src/styles/**', 'src/pages/**', 'src/contexts/**', 'src/api/**'],
    coverage: {
        reporter: ['lcov', "html"],
        provider: 'c8',
        exclude: ['node_modules/**', 'dist/**','src/components/**', 'src/assets/**', 'src/layouts/**', 'src/styles/**', 'src/pages/**', 'src/contexts/**', 'src/api/**']
    }
  },
})