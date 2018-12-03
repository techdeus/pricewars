module.exports = {
    'parser': 'babel-eslint',
    'extends': 'airbnb',
    'env': {
      'browser': true,
      'node': true,
      'jest': true,
    },
    'plugins': [
      'react',
      'jsx-a11y',
      'import'
    ],
    'rules': {
      'react/forbid-prop-types': 'warn',
      'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx"] }],
    }
  };  