const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPath: resolveApp('.'),
  appDist: resolveApp('dist'),
  appExample: resolveApp('example'),
  appHtml: resolveApp('example/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appIndexTs: resolveApp('src/index.ts'),
  appIndex: resolveApp('src/index'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appAssets: resolveApp('src/assets'),
  appDistAssets: resolveApp('dist/assets'),
  appTsConfig: resolveApp('tsconfig.json'),
  appNodeModules: resolveApp('node_modules'),
  appOverrides: resolveApp('config-overrides'),
  appDirectory,
};

