const serve = require('koa-static');
const Koa = require('koa');
const { json, join } = require('path');
const proxy = require('koa-proxy');
const openurl = require('openurl');
const { spawn } = require('child_process');
const portfinder = require('portfinder');
const chalk = require('chalk');
const { historyApiFallback } = require('koa2-connect-history-api-fallback');
const app = new Koa();

app.proxy = true;

app.use(historyApiFallback);

app.use(serve(json(__dirname + '/../example')));

app.use(proxy({
  host: '',
  match: '',
}));

(async () => {
  portfinder.basePort = 3000;
  const PORT = await portfinder.getPortPromise();

  app.listen(PORT, () => {
    console.log(chalk.cyan('serve:'), `listening on port ${PORT}`);
    openurl.open(`http://127.0.0.1:${PORT}`);
    spawn('npm', [ 'run', 'dev' ], {
      shell: process.platform === 'win32',
      cwd: join(__dirname, '../'),
      stdio: [ 'inherit', 'inherit', 'inherit' ],
    });
  });
})();
