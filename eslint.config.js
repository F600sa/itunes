import path from 'path';

import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';

const compat = new FlatCompat({ baseDirectory: path.resolve(process.cwd()) });

const eslintConfig = [
  // Next.js core rules
  ...compat.extends('next', 'next/core-web-vitals'),

  // TypeScript rules
  ...compat.extends('plugin:@typescript-eslint/recommended'),

  // Prettier integration
  ...compat.extends('plugin:prettier/recommended'),

  // Explicit parser for TypeScript files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
        ecmaVersion: 2020,
      },
    },
  },

  // Custom rules
  {
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, semi: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowTernary: true, allowShortCircuit: true },
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [{ pattern: 'react', group: 'external', position: 'before' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];

export default eslintConfig;
