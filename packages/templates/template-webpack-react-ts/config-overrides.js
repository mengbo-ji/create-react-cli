module.exports = function(config) {
  config.devServer = {
    host: '127.0.0.1',
    port: 3000,
    historyApiFallback: { // 二级路由 页面刷新
      rewrites: [{
        from: /^\/$/,
        to: './index.html',
      }],
    },
  };
  return config;
};
