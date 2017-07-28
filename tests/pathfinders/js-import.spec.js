const jsImportModule = require('../../src/pathfinders/js-webpack-async-import')

//making sure api sheme is valid
require('./api-test-factory')(jsImportModule)

test('Matches on all require syntaxes', () => {
  let path = 'path' + Math.random()
  expect(jsImportModule.pathfinder(`import( /* */ "${path}")`)).toEqual([path])
})

test('Matches only the right parts of the snippet', () => {
  let snippet = `
    import(/**/'a'), System.import(/* webpack-chunk-name: whaterver */ './b');

    let foo = {}
    foo.require = () => {}
    foo.import('lils')

    const module = require("./path/to/module.js")
  `

  expect(jsImportModule.pathfinder(snippet))
    .toEqual(['a', './b'])
})
