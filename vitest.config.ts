/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/hooks/**'],
    environment: 'jsdom',
    exclude:  ['src/components/**', 'src/assets/**', 'src/layouts/**', 'src/styles/**', 'src/pages/**', 'src/contexts/**', 'src/api/**'],
    coverage: {
        exclude: ['src/components/**', 'src/assets/**', 'src/layouts/**', 'src/styles/**', 'src/pages/**', 'src/contexts/**', 'src/api/**']
    }
  },
})