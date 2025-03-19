import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier';
import jsonPlugin from '@eslint/json';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const prettierConfig = {
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: ["prettier-plugin-tailwindcss"]
};

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'next',
    'prettier',
  ),

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
    plugins: {
      'unused-imports': unusedImports,
      "simple-import-sort": simpleImportSort,
      json: jsonPlugin,
      prettier: eslintPluginPrettierRecommended,
    },

    rules: {
      'prettier/prettier': ['error', prettierConfig],


      "simple-import-sort/imports": [
        "error",
        {
          "groups": [
            // 1. Side effect imports at the start.
            ["^\\u0000"],
            // 2. `react` and packages: Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ["^react$", "^@?\\w"],
            // 3. Absolute imports and other imports.
            // Anything not matched in another group.
            ["^@", "^"],
            // 4. relative imports from same folder "./"
            ["^\\./"],
            // 5. style module imports always come last
            ["^.+\\.(module.css|module.scss)$"],
            // 6. media imports
            ["^.+\\.(gif|png|svg|jpg)$"]
          ]
        }
      ],

      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': ['warn'],
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
    },

    ignores: [
      'node_modules/',
      '.next/',
      'build/',
    ],
  },
];

export default eslintConfig;
