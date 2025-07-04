import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginPromise from 'eslint-plugin-promise';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    settings: {
      react: {
        version: 'detect',
      },
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      sonarjs.configs.recommended,
      eslintPluginPrettierRecommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      pluginPromise.configs['flat/recommended'],
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {},
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
        },
      ],

      'linebreak-style': ['error', 'unix'],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'sonarjs/no-commented-code': 0,
      'sonarjs/pseudo-random': 0,
      'sonarjs/todo-tag': 1,
      'sonarjs/unused-import': 0,
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 0,
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      'sonarjs/no-unused-vars': 0,
      'sonarjs/no-dead-store': 0,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '[iI]gnored',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: true,
          jsxSingleQuote: true,
          trailingComma: 'es5',
          bracketSpacing: true,
          bracketSameLine: false,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],
    },
  }
);
