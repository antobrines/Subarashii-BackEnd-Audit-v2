module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true,
    'mocha': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 13
  },
  'plugins': [
    'mocha'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};