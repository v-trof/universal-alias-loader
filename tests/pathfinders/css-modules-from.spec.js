const cssFromModule = require('../../src/pathfinders/css-modules-from')

//making sure api sheme is valid
require('./api-test-factory')(cssFromModule)

test('Matches on all url syntaxes', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(cssFromModule.pathfinder(`composes: className from "${path}"`)).toEqual([path])
  //single quotes
  expect(cssFromModule.pathfinder(`composes: className from  '${path}'`)).toEqual([path])
})

test('Matches only the right parts of the snippet', () => {
  let snippet = `
    body {
      backgroud: url(a.png)
    }

    .url-btn:active {
      composes: .btn from '@components/btn/btn.css';
    }

    .form {
      backgroud: black;
    }

    .form[lang="pt"] {
      backgroud: black;
    }

    .from-compose {
      composes: .from from '@here'; /*not very valid but edge tests matter*/
    }
  `

  expect(cssFromModule.pathfinder(snippet)).toEqual(['@components/btn/btn.css', '@here'])
})
