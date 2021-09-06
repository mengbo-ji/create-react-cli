const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const server = require('./server');
const paths = require('./paths');
const overrides = require(paths.appOverrides);

function getDevServerConfig(webpackConfig) {
  const devServerConfig = {
    contentBase: paths.appDist,
    overlay: false, // 不在浏览器页面上显示错误
    open: true,
    hot: true,
    publicPath: '/',
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
      children: false,
      builtAt: true,
      modules: false,
      excludeAssets: [
        /assets/,
      ],
      errors: true,
    },
    disableHostCheck: true,
  };
  webpackConfig.devServer = Object.assign(devServerConfig, webpackConfig.devServer);
  return webpackConfig;
}

async function compile(type) {
  const newWebpackConfig = getDevServerConfig(overrides(webpackConfig));
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
