const webpack = require('webpack');
const chalk = require('chalk');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const babelConfig = require('./babelConfig');
const clientEnvironment = require('./env');
const { getAlais, getPublicPath, getBuilderConfig } = require('./hlper');
const { LOG_VALUE_COLOR, LOG_LABEL_COLOR } = require('./constant');

const builderConfig = getBuilderConfig();
const env = clientEnvironment();
const publicPath = getPublicPath();
// 生产环境将css提取到单独的文件，其他情况下不需要，不能和style-loader一起使用
const doExtract = env.raw.NODE_ENV === 'production';

const getStyleLoaders = (cssOptions, preProcessor) => {
  return [
    doExtract && MinniCssExtractPlugin.loader,
    !doExtract && require.resolve('style-loader'),
    builderConfig.typescript && require.resolve('css-modules-typescript-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-nested'),
            [
              require('postcss-preset-env'),
              {
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

/** @type {import('webpack').Configuration} */
const config = {
  entry: paths.appIndex,
  mode: env.raw.NODE_ENV,
  cache: {
    type: 'filesystem',
  },
  output: {
    path: paths.appDist,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    publicPath,
  },
  resolve: {
    // 解析模块的可选项
    extensions: [ '.mjs', '.js', '.jsx', '.json', '.ts', '.tsx', '.less' ], // 用到文件的扩展名
    // 优化模块查找路径，src优先于 node_modules
    modules: [ paths.appSrc, 'node_modules' ],
    alias: getAlais(),
  },
  module: {
    rules: [{
      // 使用oneOf, 会依次配置loader, 如果未匹配到的会默认使用最后的 file-loader
      oneOf: [
        // 加载图片
        {
          test: /\.(png|jpe?g|gif|bmp|svg|eot|ttf|woff|woff2)$/,
          type: 'asset',
          generator: {
            filename: '[name].[contenthash:8].[ext]',
          },
        },
        // 加载js
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          include: paths.appSrc, // 精确指定要处理的目录
          loader: require.resolve('babel-loader'),
          options: babelConfig,
        },
        // 支持引用html模板
        {
          test: /\.(html|htm|tpl)$/,
          loader: require.resolve('html-loader'),
        },
        // src/*.css -> css module
        {
          test: /\.css$/,
          exclude: /\/node_modules\//,
          use: getStyleLoaders(
            {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportLocalsConvention: 'camelCase',
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            }
          ),
        },
        // ./node_modules/*.css -> 全局css
        {
          test: /\.css$/,
          include: [ paths.appNodeModules ],
          use: getStyleLoaders({
            importLoaders: 1,
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        {
          test: /\.less$/,
          exclude: /\/node_modules\//,
          use: getStyleLoaders(
            {
              importLoaders: 1,
              modules: {
                mode: 'local',
                exportLocalsConvention: 'camelCase',
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
            {
              loader: require.resolve('less-loader'),
            }
          ),
        },
        // ./node_modules/*.less -> 全局less
        {
          test: /\.less$/,
          include: [ paths.appNodeModules ],
          use: getStyleLoaders(
            {
              importLoaders: 1,
            },
            {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {
                  modifyVars: {
                    'primary-color': '#244ba8',
                    'link-color': '#244ba8',
                    'font-size-base': '12px',
                    'text-color': 'rgba(0,0,0,.65)',
                  },
                  javascriptEnabled: true,
                },
              },
            }
          ),
          sideEffects: true,
        },
        {
          exclude: [ /\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/ ],
          type: 'asset/resource',
          generator: {
            filename: '[name].[contenthash:8].[ext]',
          },
        },
      ],
    }],
  },
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true,
    children: true,
    builtAt: true,
    modules: false,
    excludeAssets: [
      /assets/,
    ],
    errors: true,
  },
  plugins: [
    new webpack.DefinePlugin(env.stringified),
    // 处理css路径问题
    new CssUrlRelativePlugin(),
    // 显示构建进度
    new ProgressBarPlugin(),
    // 处理路径大小写问题
    new CaseSensitivePathsPlugin(),
    // 处理 .locale文件
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    // 静态资源输出
    new CopyWebpackPlugin({
      patterns: [
        { from: paths.appAssets, to: paths.appDistAssets },
      ],
    }),
    new HtmlWebpackPlugin({
      template: paths.appExample + '/index.html',
      filename: 'index.html',
    }),
  ].filter(Boolean),
  // 定义sourcemap 配置
  devtool: 'cheap-module-source-map',
  // 关闭性能提示
  performance: {
    hints: false,
  },
};

console.log(chalk.hex(LOG_LABEL_COLOR).bold('INFO:'), `当前构建模式为 ${chalk.hex(LOG_VALUE_COLOR).bold(env.raw.NODE_ENV)} 模式`);

if (doExtract) {
  config.plugins.push(
    new MinniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: true,
    })
  );
}

if (env.raw.NODE_ENV === 'development') {
  // 热更新
  config.plugins.push(new ReactRefreshWebpackPlugin({
    overlay: false,
  }));
}

if (env.raw.NODE_ENV === 'production') {
  const TerserPlugin = require('terser-webpack-plugin');
  const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin(
        {
          parallel: true,
          terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              comparisons: false,
            },
            safari10: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }
      ),
      new CssMinimizerPlugin(),
    ],
  };

  // 开启性能提示
  config.performance = {};
  // sourceMap 开启nosources
  config.devtool = 'nosources-source-map';
}

// 支持ts
if (builderConfig.typescript) {
  console.log(chalk.hex(LOG_LABEL_COLOR).bold('INFO:'), `当前构建已开启 ${chalk.hex(LOG_VALUE_COLOR).bold('TypeScript')} 支持`);
  // eslint 检查
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: true,
    })
  );
}

// 开启 profile 分析
if (process.env.PROFILE) {
  console.log(chalk.hex(LOG_LABEL_COLOR).bold('INFO:'), `当前构建已开启 ${chalk.hex(LOG_VALUE_COLOR).bold('profile')} 分析`);
  config.plugins.push(new BundleAnalyzerPlugin());
}

const entryInfo = !(env.raw.MICRO && process.MICRO_CONFIG.mode === 'UNITY') ? JSON.stringify(config.entry) :
  JSON.stringify(config.entry)
    .split(',')
    .join('\n  ')
    .replace('{', '\n  ')
    .replace('}', '');
console.log(chalk.hex(LOG_LABEL_COLOR).bold('INFO:'), `当前构建入口为 ${chalk.hex(LOG_VALUE_COLOR).bold(entryInfo)}`);

module.exports = config;
