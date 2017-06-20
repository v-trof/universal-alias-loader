# universal-alias-loader •
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

## Options (Query)
| NameDescription | Type     | Default       | Description                                                                                                      |
|-----------------|----------|---------------|------------------------------------------------------------------------------------------------------------------|
| alias           | {Object} | {}            | Object keys are aliases, values are resolves {'@alias': 'resolve'}                                               |
| root            | {String} | process.cwd() | Abs path to project root                                                                                         |
| syntax          | {String} | auto          | "js" for ES6 imports & CommonJS require ; "css" for css @import & css url() replacements |
