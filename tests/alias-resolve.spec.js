const path = require('path')

const asliasResolver = require('../src/alias-resolve')
const aliasToAbsolute = require('../src/alias-to-absolute')

test('replaces abs. path aliases', function() {
  let source = `require('@blah')`
  let resolves = aliasToAbsolute({
    '@blah': process.cwd()
  }, process.cwd())

  expect(asliasResolver(resolves, '/', source, ['@blah']))
    .toEqual(`require('${process.cwd().split(path.sep).join('/')}')`)
})


test('replaces relative path as relative to root aliases', function() {
  let source = `require('@blah')`
  let resolves = aliasToAbsolute({
    '@blah': './bla/blah'
  }, process.cwd())

  let mergedPath = path.join(process.cwd(), './bla/blah').split(path.sep).join('/')

  expect(asliasResolver(resolves, process.cwd(), source, ['@blah']))
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

  expect(asliasResolver(resolves, '/', source, matches))
    .toEqual(`require('${resolves['@a']}');
                require('${expectedB}');
                require('a')`)
})

test('url aliases are interpreted as abs. path aliases', function() {
  let source = `url('@cdn')`
  let resolves = aliasToAbsolute({
    '@cdn': 'https://MYSUPERCDN.awsome/static'
  }, process.cwd())

  expect(asliasResolver(resolves, '/root/', source, ['@cdn']))
    .toEqual(`url('${resolves['@cdn']}')`)
})
