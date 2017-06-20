const cssImportModule = require('../../src/pathfinders/css-import')

//making sure api sheme is valid
require('./api-test-factory')(cssImportModule)

test('Matches import syntaxes', () => {
  let path = 'path' + Math.random()
  //only import & path
  expect(cssImportModule.pathfinder(`@import '${path}';`)).toEqual([path])
  expect(cssImportModule.pathfinder(`@import "${path}";`)).toEqual([path])

  //context
  expect(cssImportModule.pathfinder(`@import "${path}" (min-width:320px);`)).toEqual([path])
})

test('Matches import url() syntaxes', () => {
    let path = 'path' + Math.random()

    //url double quotes
    expect(cssImportModule.pathfinder(`@import url("${path}");`)).toEqual([path])
    //url single quotes
    expect(cssImportModule.pathfinder(`@import url('${path}');`)).toEqual([path])
    //url no quotes
    expect(cssImportModule.pathfinder(`@import url(${path});`)).toEqual([path])

    //context
    expect(cssImportModule.pathfinder(`@import url(${path}) (min-width:320px);`))
    .toEqual([path])
})



test('Matches only the right parts of the snippet', () => {
  let snippet = `
  @import './print.css' print;
  @import url('@bootstrap');
    body {
      backgroud: url(a.png)
    }

    .url-btn:active {
      border-image: url('@cdn/nice_pattern.svg')
    }
  `

  expect(cssImportModule.pathfinder(snippet)).toEqual(['./print.css', '@bootstrap'])
})
