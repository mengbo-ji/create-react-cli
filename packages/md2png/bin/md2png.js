#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package');
const md2png = require('../lib');

program.version(pkg.version)
  .usage('input')
  .option('-o, --output <output>', '图片输出路径')
  .option('-w, --width <width>', '图片宽度')
  .parse(process.argv)
  .args.length || program.help();

const { args: [ input ] } = program;
const { output, width } = program.opts();
md2png(input, { output, width });
