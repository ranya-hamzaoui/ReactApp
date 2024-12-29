module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    transformIgnorePatterns: [
      '/node_modules/(?!axios)/',
    ],
  };