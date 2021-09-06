
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');

module.exports = async function(devServer, compiler) {
  const { port: PORT, host: HOST } = devServer;
  const httpServer = new WebpackDevServer(compiler, devServer);

  httpServer.listen(PORT, HOST, err => {
    if (err) {
      return console.log(chalk.red(err));
    }
  });

  [ 'SIGINT', 'SIGTERM' ].forEach(function(sig) {
    process.on(sig, function() {
      httpServer.close();
      process.exit();
    });
  });
};
