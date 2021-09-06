
const ENV_TYPE = process.env.NODE_ENV || 'production';
process.env.NODE_ENV = ENV_TYPE;
process.env.BABEL_ENV = ENV_TYPE;

// 保证 unhandle process 能抛出异常
process.on('unhandledRejection', err => {
  throw err;
});

// 注入环境变量
require('../lib/env');

const chalk = require('chalk');
const { compile } = require('../lib/compile');

compile('build').catch(err => {
  console.error(chalk.red(err.stack || err));
  process.exit(1);
});

