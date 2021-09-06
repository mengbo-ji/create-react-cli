
const fs = require('fs');
const paths = require('./paths');
const chalk = require('chalk');

function getAlais() {
  const folderName = fs.readdirSync(paths.appSrc).filter(v => !v.includes('.'));
  const alais = {
    src: paths.appSrc,
  };
  folderName.forEach(name => {
    alais[name] = paths.appSrc + '/' + name;
  });
  return alais;
}

function getPublicPath() {
  const builderConfig = getBuilderConfig();
  let publicPath;
  if (process.env.NODE_ENV === 'development') {
    publicPath = builderConfig.devPublicPath;
  } else if (process.env.NODE_ENV === 'production') {
    publicPath = builderConfig.prodPublicPath;
  }
  return publicPath || '/';
}

function getBuilderConfig() {
  const packages = fs.readFileSync(paths.appPackageJson, 'utf-8');

  let res;
  try {
    res = JSON.parse(packages)['builder-config'];
  } catch (error) {
    console.error(chalk.red(error));
    process.exit(1);
  }
  return res;
}

module.exports = {
  getAlais,
  getPublicPath,
  getBuilderConfig,
};

