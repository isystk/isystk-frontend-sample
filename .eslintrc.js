module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint', 'react'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    project: "./tsconfig.json", // ルールはTypescript側の設定を利用する
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // 必要に応じてルールを追加
    '@typescript-eslint/no-empty-interface': 'off', // 空のインターフェースは許可
  },
}
