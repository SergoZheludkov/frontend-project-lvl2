module.exports = {
    env: {
      node: true,
      es6: true,
      jest: true,
    },
    extends: [
      'airbnb-base',
      'plugin:jest/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'jest',
      'babel',
    ],
    rules: {
      'no-console': 0,
      'import/extensions': 0,
    },
  };