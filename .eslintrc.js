module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended'
  ],
  ignorePatterns: ['dist/**', 'node_modules/**', '*.d.ts'],
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_' 
    }],
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    'no-undef': 'warn',
    'no-constant-condition': 'warn',
    'no-case-declarations': 'warn',
    'no-useless-backreference': 'warn',
    'no-misleading-character-class': 'warn',
    'prefer-const': 'warn',
    'require-yield': 'warn'
  }
};