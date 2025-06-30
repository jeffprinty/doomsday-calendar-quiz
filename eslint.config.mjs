import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';

import { fixupConfigRules } from '@eslint/compat';

import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';
import sonarjs from 'eslint-plugin-sonarjs';

import  { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default tseslint.config(
  { ignores: ['dist'] },
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
    },
    extends: [
      sonarjs.configs.recommended,
      eslintPluginPrettierRecommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      fixupConfigRules(compat.extends(
        'eslint:recommended',
        'plugin:promise/recommended',
        'plugin:jsx-a11y/recommended',
      )),
      ...tseslint.configs.recommended,
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
      indent: ['error', 2, {
          SwitchCase: 1,
      }],

      'linebreak-style': ['error', 'unix'],

      quotes: ['error', 'single', {
          avoidEscape: true,
      }],

      'sonarjs/no-commented-code': 0,
      'sonarjs/pseudo-random': 0,
      'sonarjs/todo-tag': 0,

      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 0,
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',

      'prettier/prettier': ['error', {
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
      }],
    },
  }
);
