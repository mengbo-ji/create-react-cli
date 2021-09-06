const webpack = require('webpack');
const portfinder = require('portfinder');
const chalk = require('chalk');
const webpackConfig = require('./webpack.config');
const server = require('./server');
const paths = require('./paths');
const overrides = require(paths.appOverrides);
const { LOG_COLOR } = require('./constant');

function getPort(webpackConfig) {
  return new Promise((resolve, reject) => {
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err);
        return;
      }

      console.log(chalk.cyan('INFO:'), `Port ${chalk.hex(LOG_COLOR)(webpackConfig.devServer.port)} is in use, trying another one...`);
      webpackConfig.devServer.port = port;
      resolve(webpackConfig);
    });
  });
}

function getStats(webpackConfig) {
  return new Promise(resolve => {
    if (process.env.STATS) {
      webpackConfig.devServer.stats = {
        chunks: false,
        chunkModules: false,
        colors: true,
        children: false,
        builtAt: true,
        modules: false,
        excludeAssets: [
          /assets/,
        ],
      };
    } else {
      webpackConfig.devServer.stats = 'errors-only';
    }
    resolve(webpackConfig);
  });
}

// devServer 配置拦截
async function devServerInterceptor(webpackConfig) {
  return await getPort(webpackConfig).then(webpackConfig => getStats(webpackConfig));
}

async function compile(type) {
  const newWebpackConfig = await devServerInterceptor(overrides(webpackConfig));
  const compiler = webpack(newWebpackConfig);

  return new Promise((resolve, reject) => {
    try {
      const callback = (err, stats) => {
        if (err) {
          console.error(err.stack || err);
          if (err.details) {
            console.error(err.details);
          }
          reject(err);
          return;
        }

        if (process.env.STATS) {
          console.log(stats.toString({
            chunks: false,
            chunkModules: false,
            colors: true,
            children: false,
            builtAt: true,
            modules: false,
            excludeAssets: [
              /assets/,
            ],
          }));
        }

        if (stats.hasErrors()) {
          reject(new Error(stats.toJson().errors));
        } else {
          resolve();
        }
      };

      if (type === 'dev') {
        // compiler.watch({
        //   ignored: /node_modules/,
        //   aggregateTimeout: 300,
        // }, callback);
        resolve(server(newWebpackConfig.devServer, compiler));
      } else {
        compiler.run(callback);
      }
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  compile,
};
