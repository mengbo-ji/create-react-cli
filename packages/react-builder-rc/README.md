# 介绍

### 基于webpack4、babel7开发的一款 react项目构建器

### 特性

- 基于webpack4、babel7开发
- 集成了 TypeScript构建、webpack-dev-server支持、热更新、最新的babel配置(支持到es2020)
- 让你不再关注 bable 和 webpack等乱七八糟头疼的配置

- 不需要改动之前已有的代码，轻松接入
- 目前支持 `dev`、`build` 两个常用构建指令
- 支持微前端构建，支持微前端单文件打包构建，支持统一入口打包构建

- 提高开发效率、提高团队前端工程化能力
- 支持通过config-overrieds 文件去添加 webpack 配置

# 安装

```js
npm install --save-dev react-builder-rc
```

# 使用

## package.json 配置

### builder-config

这个配置告知构建器，你要使用什么方式去构建项目

```json
"builder-config": {},
```

| Parameter      | Description                  | Type    | Optional Value | Default |
| -------------- | ---------------------------- | ------- | -------------- | ------- |
| devPublicPath  | 开发环境publicPath           | string  | --             | '/'     |
| prodPublicPath | 生产环境publicPath           | string  | --             | '/'     |
| typescript     | 是否开启ts构建               | boolean | --             | false   |

### npm scripts 

```jso
"dev": "react-builder-rc dev",
"build": "react-builder-rc build",
```

| Description                             | Type   | Optional Value | Default     |
| --------------------------------------- | ------ | -------------- | ----------- |
| 开发 指令                               | string | dev            | dev         |
| 构建 指令                               | string | build          | build       |
| 是否开启 profile 分析                   | string | --profile      | none        |

## Template 配置

### config-overrides.js

现在项目中必须在根目录 添加 `config-overrieds.js`，它可以让你添加webpack配置，哪怕你不需要也要返回config对象

> 在你不清楚的情况下  你最好只添加externals和devServer的配置，其他配置的已经内置好
>
> alais别名: 已经动态读取了src下的目录，eg: src: src; components: components。文件夹名字是什么 别名就是什么

```js
module.exports = function(config) {
  config.externals = {};
  config.devServer = {};
  return config;
};
```

### SPA入口项目

单入口页面: 入口文件`index.ts` / `index.js `必须放在src文件夹根目录下

静态模板html: 项目根目录下创建 `example`文件夹，并在example下创建`index.html` 作为静态模板html

