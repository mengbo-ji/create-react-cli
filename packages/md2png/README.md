# mock-prompt

[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![NPM Version][version-image]][version-url]
[![License][license-image]][license-url]
[![Dependency Status][dependency-image]][dependency-url]
[![devDependency Status][devdependency-image]][devdependency-url]
[![Code Style][style-image]][style-url]

> mock inquirer prompt for unit/e2e test

## TODO

Make sure the inquirer instance is one.

## Installation

```shell
$ yarn add mock-prompt --dev

# or npm
$ npm install mock-prompt --save-dev
```

## Usage

```javascript
const inquirer = require('inquirer')
const mockPrompt = require('mock-prompt')

mockPrompt({ foo: 'hello foo' })

const questions = [
  { name: 'foo', type: 'input', message: 'foo' },
  { name: 'bar', type: 'confirm', message: 'bar', default: false }
]

inquirer.prompt(questions)
  .then(answers => {
    console.log(answers)
    // => { foo: 'hello foo', bar: false }
  })
```

## API

### mockPrompt(fills)

#### fills

- Type: `object`
- Details: fill answers

## Contributing

1. **Fork** it on GitHub!
2. **Clone** the fork to your own machine.
3. **Checkout** your feature branch: `git checkout -b my-awesome-feature`
4. **Commit** your changes to your own branch: `git commit -am 'Add some feature'`
5. **Push** your work back up to your fork: `git push -u origin my-awesome-feature`
6. Submit a **Pull Request** so that we can review your changes.

> **NOTE**: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT](LICENSE) &copy; [汪磊](https://zce.me/)



[travis-image]: https://img.shields.io/travis/zce/mock-prompt.svg
[travis-url]: https://travis-ci.org/zce/mock-prompt
[codecov-image]: https://img.shields.io/codecov/c/github/zce/mock-prompt.svg
[codecov-url]: https://codecov.io/gh/zce/mock-prompt
[downloads-image]: https://img.shields.io/npm/dm/mock-prompt.svg
[downloads-url]: https://npmjs.org/package/mock-prompt
[version-image]: https://img.shields.io/npm/v/mock-prompt.svg
[version-url]: https://npmjs.org/package/mock-prompt
[license-image]: https://img.shields.io/npm/l/mock-prompt.svg
[license-url]: https://github.com/zce/mock-prompt/blob/master/LICENSE
[dependency-image]: https://img.shields.io/david/zce/mock-prompt.svg
[dependency-url]: https://david-dm.org/zce/mock-prompt
[devdependency-image]: https://img.shields.io/david/dev/zce/mock-prompt.svg
[devdependency-url]: https://david-dm.org/zce/mock-prompt?type=dev
[style-image]: https://img.shields.io/badge/code_style-standard-brightgreen.svg
[style-url]: http://standardjs.com