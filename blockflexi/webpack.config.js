const path = require('path');
const webpack = require('webpack');

module.exports = {
  // ...
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
      https: false,
      http: false,
      crypto:false,
      buffer: false,
      stream: false
    }
  }
  // ...
}
