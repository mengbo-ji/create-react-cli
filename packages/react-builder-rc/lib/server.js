
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const chalk = require('chalk');

module.exports = async function(devServer, compiler) {
  portfinder.basePort = devServer.port || 3000;
  const PORT = await portfinder.getPortPromise();
  const server = new WebpackDevServer({ ...devServer, port: PORT }, compiler);

  server.startCallback(err => {
    if (err) {
      return console.log(chalk.red(err));
    }
  });

  [ 'SIGINT', 'SIGTERM' ].forEach(function(sig) {
    process.on(sig, function() {
      server.stopCallback(() => {
        process.exit();
      });
    });
  });
};
