const webpack = require('webpack');
const chalk = require('chalk');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MinniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const babelConfig = require('./babelConfig');
const clientEnvironment = require('./env');
const { getAlais, getPublicPath, getBuilderConfig } = require('./hlper');
const { LOG_COLOR } = require('./constant');

const builderConfig = getBuilderConfig();
const env = clientEnvironment();
const publicPath = getPublicPath();
// 生产环境启用路径映射，其他情况下不需要
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
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-nested'),
          require('postcss-preset-env')({
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
          }),
        ],
      },
    },
    preProcessor,
  ].filter(Boolean);
};

const config = {
  entry: paths.appIndex,
  mode: env.raw.NODE_ENV,
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
          test: /\.(svg|bmp|gif|png|jpe?g)$/,
          loader: require.resolve('url-loader'),
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
          // resourceQuery: /css_modules/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              getLocalIdent: getCSSModuleLocalIdent,
            },
            localsConvention: 'camelCase',
          }),
        },
        // ./node_modules/*.css -> 全局css
        // 没有被上面 css 匹配上的 src/*.css -> 全局css
        {
          test: /\.css$/,
          include: [ paths.appNodeModules ],
          use: getStyleLoaders({
            importLoaders: 1,
          }),
        },
        {
          test: /\.less$/,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: true,
          },
          {
            loader: require.resolve('less-loader'),
            options: {
              javascriptEnabled: true,
            },
          }),
        },
        {
          exclude: [ /\.(js|jsx|mjs|ts|tsx)$/, /\.html$/, /\.json$/ ],
          loader: require.resolve('file-loader'),
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
      ],
    }],
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
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 分离css插件参数为提取出去的路径
    new MinniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: true,
    }),
    // 静态资源输出
    new CopyWebpackPlugin([
      {
        from: paths.appAssets,
        to: paths.appDistAssets,
        ignore: [ '.*' ],
      }]
    ),
    new HtmlWebpackPlugin({
      template: paths.appExample + '/index.html',
      filename: 'index.html',
      hash: true, // 开启hash 防止缓存
    }),
  ].filter(Boolean),
  // 定义sourcemap 配置
  devtool: 'cheap-module-source-map',
  // 关闭性能提示
  performance: {
    hints: false,
  },
};

console.log(chalk.cyan('INFO:'), `当前构建模式为 ${chalk.hex(LOG_COLOR)(env.raw.NODE_ENV)} 模式`);

if (env.raw.NODE_ENV === 'development') {
  // 热更新
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (env.raw.NODE_ENV === 'production') {
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  const TerserPlugin = require('terser-webpack-plugin');

  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          compress: {
            comparisons: false,
          },
          output: {
            ascii_only: true,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  };

  // 压缩css
  config.plugins.push(
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        autoprefixer: false,
        zindex: false,
      },
      canPrint: true,
    })
  );
  // 开启性能提示
  config.performance = {};
}

// 支持ts
if (builderConfig.typescript) {
  console.log(chalk.cyan('INFO:'), `当前构建已开启 ${chalk.hex(LOG_COLOR)('TypeScript')} 支持`);
  // eslint 检查
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      tsconfig: paths.appTsConfig,
      async: false,
      silent: true,
      eslint: true,
    })
  );
}

// 开启 profile 分析
if (process.env.PROFILE) {
  console.log(chalk.cyan('INFO:'), `当前构建已开启 ${chalk.hex(LOG_COLOR)('profile')} 分析`);
  config.plugins.push(new BundleAnalyzerPlugin());
}

console.log(chalk.cyan('INFO:'), `当前构建入口为 ${chalk.hex(LOG_COLOR)(JSON.stringify(config.entry))}`);
module.exports = config;
