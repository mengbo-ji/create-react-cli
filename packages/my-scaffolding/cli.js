#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?',
  },
]);

app.then(answers => {
  // 根据用户回答 生成指定文件

  // 模板目录
  const templateDir = path.join(__dirname, 'templates');

  // 输出目录
  const destDir = process.cwd();
  /* eslint-disable */
  // 将模板下的所有文件全部 复制到指定目录
  fs.readdir(templateDir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      ejs.renderFile(path.join(templateDir, file), answers, (err, result) => {
        if (err) throw err;
        fs.writeFileSync(path.join(destDir, file), result)
      });
    });
  });
});
