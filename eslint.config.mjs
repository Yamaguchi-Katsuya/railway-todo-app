import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // ファイルの対象を指定
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    // グローバル変数や言語オプションを設定
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  // JavaScript の推奨設定を読み込む
  pluginJs.configs.recommended,
  // React の推奨設定を読み込む
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect', // React のバージョンを自動検出
      },
    },
  },
  // Prettier の競合解消設定を追加
  prettierConfig,
  {
    // Prettier プラグインを有効化し、競合エラーを出す設定
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // Prettier のエラーを ESLint に統合
    },
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
