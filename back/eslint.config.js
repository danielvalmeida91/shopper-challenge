import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,tsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'semi': ['error', 'never'],
      'quotes': ['error', 'single'],
      'eqeqeq': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'no-useless-return': 'warn',
      'no-useless-rename': 'warn',
      'no-var': 'error',
      'no-return-await': 'error',
      'no-await-in-loop': 'warn',
      'no-mixed-spaces-and-tabs': 'error',
      'indent': ['error', 2],
      'space-in-parens': ['error', 'never'],
      'space-infix-ops': 'error',
      'no-duplicate-imports': 'error',
      'prefer-const': 'error',
      'eol-last': ['error', 'always']
    },
    ignores: ['node_modules', 'dist', 'build'],
  }
]
