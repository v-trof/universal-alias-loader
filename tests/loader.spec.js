const loader = require('../index')
const path = require('path')

test('Matches webpack api scheme', (done) => {
  const fakeWebpackEnv = {
    query: {
      syntax: 'css',
      alias: {
        '@cdn': 'https://MYSUPERCDN.awsome/static/',
        '@blah': 'blah'
      }
    },
    context: process.cwd(),
    //we check for override as well
    resourcePath: 'RPATH.js',
    callback: specCB
  }

  loader.call(fakeWebpackEnv, `body {backgroud: url('@cdn/bg.png')}`)


  function specCB(err, data) {
    let expectedPropValue = `url('${fakeWebpackEnv.query.alias['@cdn']}/bg.png')`
    expect(data).toEqual(`body {backgroud: ${expectedPropValue}}`)
    done()
  }
})


test('Properly uses context & autodetection', (done) => {
    const context = process.cwd()
    const fakeWebpackEnv = {
      query: {
        alias: {
          '@module': 'path/to/module'
        }
      },
      context: context,
      resourcePath: 'RPATH.jsx',
      callback: specCB
    }

    loader.call(fakeWebpackEnv, `import '@module'`)

    function specCB(err, data) {
      expectedPath = context.split(path.sep).join('/') +
                     '/' + fakeWebpackEnv.query.alias['@module']
      expect(data).toEqual(`import '${expectedPath}'`)
      done()
    }
})
