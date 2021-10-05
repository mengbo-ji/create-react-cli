const path = require('path');
const fs = require('fs');
const marked = require('marked');
const puppeteer = require('puppeteer');
const { cosmiconfigSync } = require('cosmiconfig');

/**
 * 实现md文档转换成png图片
 * @param {string} input md文档路径
 * @param {object} params output -> png输出路径, width -> png图片宽度
 */
module.exports = async (input, { output, width }) => {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`);
  }
  // 1. 读取input路径 对应的md文档
  const contents = readFile(input);
  // 2. 将读取到的md文档转换成html
  const html = mdTransform(contents);
  // 3. html -> 图片 puppeteer headless 实现截图
  await generatePng(html, output, width);
};

function readFile(input) {
  // 将路径转换成 绝对路径
  const filename = path.resolve(input);
  // 判断文件是否存在
  if (!fs.existsSync(filename)) {
    throw new Error('文件不存在');
  }
  // 判断文件是文件夹还是文件
  const stat = fs.statSync(filename);
  if (stat.isDirectory()) {
    throw new Error('给定路径是个文件夹，而不是文件');
  }
  // 读取文件
  const contents = fs.readFileSync(filename, 'utf8');
  return contents;
}


function mdTransform(contents) {
  const fragment = marked(contents);
  // 支持 html 文件配置
  const explorerSync = cosmiconfigSync('md2png');
  const { config = {} } = explorerSync.search(process.cwd()) || {};
  const html = config.template.replace('${fragment}', fragment);
  return html;
}

async function generatePng(html, output, width) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: +width, height: 100 });
  await page.setContent(html);
  await page.screenshot({ path: output, fullPage: true });

  await browser.close();
}

