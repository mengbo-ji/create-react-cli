#!/usr/bin/env node

const chalk = require('chalk');
const { getBuilderConfig } = require('../lib/hlper');

// 配置项
const builderConfig = getBuilderConfig();
if (!builderConfig) {
  console.error(chalk.red('Error: 你必须在package.json中 添加builder-config配置, 具体配置请查看README'));
  process.exit(1);
}

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'dev' || x === 'build'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
let scriptPath;

if ([ 'dev', 'build' ].includes(script)) {
  scriptPath = '../scripts/' + script;
} else {
  console.log('Unknown script "' + script + '".');
  process.exit(1);
}

if (args.includes('--profile')) {
  process.env.PROFILE = true;
}

require(scriptPath);
