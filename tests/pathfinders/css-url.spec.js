const cssUrlModule = require('../../src/pathfinders/css-url')

//making sure api sheme is valid
require('./api-test-factory')(cssUrlModule)

test('Matches on all url syntaxes', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(cssUrlModule.pathfinder(`url("${path}")`)).toEqual([path])
  //single quotes
  expect(cssUrlModule.pathfinder(`url('${path}')`)).toEqual([path])
  //no quotes
  expect(cssUrlModule.pathfinder(`url(${path})`)).toEqual([path])
})

test('Matches only the right parts of the snippet', () => {
  let snippet = `
    body {
      backgroud: url(a.png)
    }

    .url-btn:active {
      border-image: url(@cdn/nice_pattern.svg)
    }
  `

  expect(cssUrlModule.pathfinder(snippet)).toEqual(['a.png', '@cdn/nice_pattern.svg'])
})
