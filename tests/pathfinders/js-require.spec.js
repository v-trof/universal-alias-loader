const jsRequireModule = require('../../src/pathfinders/js-require')

//making sure api sheme is valid
require('./api-test-factory')(jsRequireModule)

test('Matches on all require syntaxes', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsRequireModule.pathfinder(`require("${path}")`)).toEqual([path])
  //single quotes
  expect(jsRequireModule.pathfinder(`require('${path}')`)).toEqual([path])
})

test('Matches only the right parts of the snippet', () => {
  let snippet = `
    require('a'), require('b');
    require("node-require")

    let foo = {}
    foo.required = true

    const module = require("./path/to/module.js")
  `

  expect(jsRequireModule.pathfinder(snippet))
    .toEqual(['a', 'b', 'node-require', './path/to/module.js'])
})
