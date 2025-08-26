const { rules } = require('eslint-config-prettier')
const { env } = require('process')

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hook/recommended',
  ],
  ignorePatters: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 11, sourceType: 'module' },
  settigs: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
