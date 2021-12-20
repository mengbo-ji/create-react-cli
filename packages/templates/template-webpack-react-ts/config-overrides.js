const path = require('path')
module.exports = function(config) {
  config.devServer = {
    static: {
      directory: path.join(__dirname, './example')
    },
    host: '127.0.0.1',
    port: 3000,
  };
  return config;
};
