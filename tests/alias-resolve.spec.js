const asliasResolver = require('../src/alias-resolve')
const path = require('path')

test('replaces abs. path aliases', function() {
  let source = `require('@blah')`
  let resolves = {
    '@blah': process.cwd()
  }

  expect(asliasResolver(resolves, '/', source, ['@blah']))
    .toEqual(`require('${process.cwd().split(path.sep).join('/')}')`)
})


test('replaces relative path as relative to root aliases', function() {
  let source = `require('@blah')`
  let resolves = {
    '@blah': './bla/blah'
  }

  let mergedPath = path.join(process.cwd(), resolves['@blah']).split(path.sep).join('/')

  expect(asliasResolver(resolves, process.cwd(), source, ['@blah']))
    .toEqual(`require('${mergedPath}')`)
})

test('replaces multiple aliases', function() {
  let source = `require('@a');
                require('@b/smth');
                require('a')`
  let resolves = {
    '@a': process.cwd(),
    '@b': path.join(process.cwd(), 'sample')
  }

  let matches = ['@a', '@b/smth']
  let expectedB = resolves['@b'].split(path.sep).join('/') + '/smth'

  expect(asliasResolver(resolves, '/', source, matches))
    .toEqual(`require('${resolves['@a'].split(path.sep).join('/')}');
                require('${expectedB}');
                require('a')`)
})

test('url aliases are interpreted as abs. path aliases', function() {
  let source = `url('@cdn')`
  let resolves = {
    '@cdn': 'https://MYSUPERCDN.awsome/static'
  }

  expect(asliasResolver(resolves, '/root/', source, ['@cdn']))
    .toEqual(`url('${resolves['@cdn']}')`)
})
