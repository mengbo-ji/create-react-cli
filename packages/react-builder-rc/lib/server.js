
const WebpackDevServer = require('webpack-dev-server');
const portfinder = require('portfinder');
const chalk = require('chalk');
const { LOG_COLOR } = require('./constant');

function getPort(devServer) {
  return new Promise((resolve, reject) => {
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err);
        return;
      }

      console.log(chalk.cyan('INFO:'), `Port ${chalk.hex(LOG_COLOR)(devServer.port)} is in use, trying another one...`);
      devServer.port = port;
      resolve(devServer);
    });
  });
}

module.exports = async function(devServer, compiler) {
  const { port: PORT, host: HOST } = await getPort(devServer);
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
