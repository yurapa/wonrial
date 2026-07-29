import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import next from '@next/eslint-plugin-next';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        HTMLElement: 'readonly',
        HTMLSelectElement: 'readonly',
        URL: 'readonly',
        Request: 'readonly',
        Response: 'readonly',
        
        // Node.js globals
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        
        // TypeScript/React globals
        React: 'readonly',
        JSX: 'readonly',
        
        // Next.js globals
        NodeJS: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react-hooks': reactHooks,
      '@next/next': next,
    },
    rules: {
      // Next.js recommended set - App Router correctness, script and font pitfalls.
      ...next.configs.recommended.rules,

      // Basic rules
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['warn', 'always'],
      
      // TypeScript rules
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      
      // React rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      
      // Next.js rules - keep the recommended set above, minus this one.
      '@next/next/no-img-element': 'off',
      
      // Disable problematic rules
      'no-undef': 'off', // TypeScript handles this better
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // TypeScript specific overrides
      'no-undef': 'off', // TypeScript compiler handles this
      // The base rule cannot read type annotations and reports the parameter
      // names of callback prop types as unused variables.
      // @typescript-eslint/no-unused-vars above covers these files instead.
      'no-unused-vars': 'off',
    },
  },
  {
    ignores: [
      'build/**',
      'node_modules/**',
      '**/*.test.ts',
      '**/*.test.tsx',
      'dist/**',
      '.next/**',
      'next-env.d.ts',
      '*.config.js',
      '.claude/**',
    ],
  },
];
