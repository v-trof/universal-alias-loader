const path = require('path')

const asliasResolver = require('../src/alias-resolve')
const aliasToAbsolute = require('../src/alias-to-absolute')

test('replaces abs. path aliases', function() {
  let source = `require('@blah')`
  let resolves = aliasToAbsolute({
    '@blah': process.cwd()
  }, process.cwd())

  expect(asliasResolver(resolves, '', source, ['@blah']))
    .toEqual(`require('${process.cwd().split(path.sep).join('/')}')`)
})


test('replaces relative path as relative to root aliases', function() {
  let source = `require('@blah')`
  let resolves = aliasToAbsolute({
    '@blah': './bla/blah'
  }, process.cwd())

  let mergedPath = path.join(process.cwd(), './bla/blah').split(path.sep).join('/')

  expect(asliasResolver(resolves, '', source, ['@blah']))
    .toEqual(`require('${mergedPath}')`)
})

test('replaces multiple aliases', function() {
  let source = `require('@a');
                require('@b/smth');
                require('a')`
  let resolves = aliasToAbsolute({
    '@a': process.cwd(),
    '@b': path.join(process.cwd(), 'sample')
  }, process.cwd())

  let matches = ['@a', '@b/smth']
  let expectedB = resolves['@b'].split(path.sep).join('/') + '/smth'

  expect(asliasResolver(resolves, '', source, matches))
    .toEqual(`require('${resolves['@a']}');
                require('${expectedB}');
                require('a')`)
})

test('url aliases are interpreted as abs. path aliases', function() {
  let source = `url('@cdn/bla')`
  let resolves = aliasToAbsolute({
    '@cdn': 'https://MYSUPERCDN.awsome/static'
  }, process.cwd())

  expect(asliasResolver(resolves, '', source, ['@cdn/bla']))
    .toEqual(`url('${resolves['@cdn']}/bla')`)
})

test('only triggers fucntional aliases when needed', function() {
  let source = `url('copy~'), url('do/not/copy')`
  let resolves = aliasToAbsolute({
    '~': (alias, path) => {
      let splitPath  = path.split('/')
      path = path.slice(0, -1) //removing ~
      path += '/' + splitPath[splitPath.length - 1].slice(0, -1)
      return path
    }
  }, process.cwd())

  expect(asliasResolver(resolves, '', source, ['copy~', 'do/not/copy']))
    .toEqual(`url('copy/copy'), url('do/not/copy')`)
})

test('works with functional aliases', function() {
  let source = `require('@thisPage/story.js')`
  let resolves = aliasToAbsolute({
    '@thisPage': (alias, path, filePath) => {
      let splitFilePath  = filePath.split('/')
      let pagePath = splitFilePath.slice(0, splitFilePath.indexOf('pages') + 2)
      path = path.replace(alias, pagePath.join('/'))
      return path
   }
  }, process.cwd())

  expect(asliasResolver(resolves, '~/pages/home/subir/file.js', source, ['@thisPage/story']))
    .toEqual(`require('~/pages/home/story.js')`)
})
