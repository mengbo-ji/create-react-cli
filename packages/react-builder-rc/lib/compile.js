const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const server = require('./server');
const paths = require('./paths');
const overrides = require(paths.appOverrides);

function getDevServerConfig(webpackConfig) {
  /** @type {import('webpack-dev-server').Configuration} */
  const devServerConfig = {
    static: {
      directory: paths.appDist,
      publicPath: '/',
    },
    client: {
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    },
    // Enable gzip compression of generated files.
    compress: true,
    open: true,
    hot: true,
    port: 3000,
    host: '127.0.0.1',
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebook/create-react-app/issues/387.
      disableDotRule: true,
      rewrites: [{
        from: /^\/$/,
        to: './index.html',
      }],
    },
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
