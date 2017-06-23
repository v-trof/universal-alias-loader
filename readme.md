# universal-alias-loader • [![Build Status](https://travis-ci.org/VsevolodTrofimov/universal-alias-loader.svg?branch=master)](https://travis-ci.org/VsevolodTrofimov/universal-alias-loader)
Loader that will replace aliases in your css and js files, supports absolute, relative and url paths

Turn this
```javascript
import { ru, en } '../../../utils/i18n'
```

Into this
```javascript
import { ru, en } '@utils/i18n'
```

## Installation
```bash
npm i universal-alias-loader
```

## API
Like any other loader
```javascript
{
  enforce: 'pre', //so it will run before other loaders
  test: /\.(css|js|jsx)$/, //yep, it parses syntax from filename (but you can set syntax yourself)
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'universal-alias-loader',  
    query: {
      alias {
        '@redux': path.join(__dirname, 'src/redux'), //or simply
        '@components': 'src/components'
        '@cdn': 'http://your.awsome.cdn.com',
      }
    }
  }
}
```

## What can be an alias?
Any string, no matter how long, but keep in mind that if you set `/` or `\\` as alias universal-alias-loader WILL replace them


## Options (Query)
| NameDescription | Type     | Default       | Description                                                                                                      |
|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------------|
| alias           | {Object} | {}            | Object keys are aliases, values are resolves {'@alias': 'resolve'}                                               |
| syntax          | {String} | auto          | **js** for ES6 `import` & CommonJS `require()`. **css** for css `@import` & css `url()` css-modules `from` replacements. **auto** determines syntax for each file individually based on the file extension|


## Syntax support
| Syntax                 | Example                                                                                            | Supported          |
|------------------------|----------------------------------------------------------------------------------------------------|--------------------|
| CSS url()              | background: url('@cdn/pics/main-bg.png'); /* With double, single, no quotes */                     | :heavy_check_mark: |
| CSS Import             | @import '@src/reset.css'; @import url(@cdn/Roboto.css); @import "@utils/print-layout.css" print;   | :heavy_check_mark: |
| CSS Modules from       | composes: className from '@components/btn.css';                                                    | :heavy_check_mark: |
| ES6 imports            | import {   Foo as Bar, Qux} from "~/constants" //multiline will be ok                              | :heavy_check_mark: |
| CommonJS require       | require(`@components/${name}`)                                                                     | :heavy_check_mark: |
| webpack magic comments | require(/* webpackChunkName: 'Anything' */ '@alias')                                               | :x:                |

Webpack magic comments are on the way, but PRs are welcome (modify js-require & js-es6import pathfinders)

## Tips
If your `webpack.confing.js` is not your project in root make sure to [have the context property in your confing set to the project root](https://github.com/gokulkrishh/how-to-setup-webpack-2)

Alias staring with `http://`, `https://`, `ws://`, `wss://`, `ftp://`, `ftps://` are determined as absolute
