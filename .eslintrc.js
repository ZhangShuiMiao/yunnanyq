module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "space-before-function-paren": 0,
    "indent":[1,2],
    'quote-props': 0,
    'dot-notation': 0,
    'consistent-return': 0,
    'no-multiple-empty-lines': 0,
    'prefer-arrow-callback': 0,
    'wrap-iife': 0,
    'no-undef-init': 0,
    'no-new-wrappers': 0,
    'linebreak-style': 0,
    'no-console': 0,
    'no-unused-vars': 0,
    'max-len': [0, 160],
    'lines-between-class-members': 0,
    'prefer-const': 0,
    'no-plusplus': 0,
    'comma-dangle': 0,
    'func-names': 0,
    'prefer-template': 0,
    'no-else-return': 0,
    'object-curly-newline': 0,
    'no-bitwise': 0,
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'no-useless-constructor': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    'no-empty-function': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
