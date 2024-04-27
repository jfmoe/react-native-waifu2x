module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['universe/native', 'universe/web', 'prettier'],
  ignorePatterns: ['build'],
  overrides: [
    {
      files: '*.json',
      parser: 'jsonc-eslint-parser',
      rules: {},
    },
  ],
};
