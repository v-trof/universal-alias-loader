const jsImportModule = require('../../src/pathfinders/js-es6import')

//making sure api sheme is valid
require('./api-test-factory')(jsImportModule)

test('Matches import "module" syntax', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsImportModule.pathfinder(`import "${path}"`)).toEqual([path])
  //single quotes
  expect(jsImportModule.pathfinder(`import '${path}'`)).toEqual([path])

  //template strings
  expect(jsImportModule.pathfinder('import `' + path + '`')).toEqual([path])
})

test('Matches import * from "module" syntax', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsImportModule.pathfinder(`import * from "${path}"`)).toEqual([path])
  //single quotes
  expect(jsImportModule.pathfinder(`import * from '${path}'`)).toEqual([path])
})

test('Matches import var from "module" syntax', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsImportModule.pathfinder(`import var from "${path}"`)).toEqual([path])
  //single quotes
  expect(jsImportModule.pathfinder(`import var from '${path}'`)).toEqual([path])

  //template strings
  expect(jsImportModule.pathfinder('import var from `' + path + '`')).toEqual([path])
})

test('Matches import {...} from "module" syntax', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsImportModule.pathfinder(`import {Foo as Bar, Qux} from "${path}"`)).toEqual([path])
  expect(jsImportModule.pathfinder(`import { Foo, Bar } from "${path}"`)).toEqual([path])
  expect(jsImportModule.pathfinder(`import { Foo } from "${path}"`)).toEqual([path])

  //single quotes
  expect(jsImportModule.pathfinder(`import {Foo as Bar, Qux} from '${path}'`)).toEqual([path])
  expect(jsImportModule.pathfinder(`import { Foo, Bar } from '${path}'`)).toEqual([path])
  expect(jsImportModule.pathfinder(`import { Foo } from '${path}'`)).toEqual([path])
})

test('Matches multiline import {...} from "module" syntax', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsImportModule.pathfinder(`
    import {
    Foo as Bar,
    Qux} from "${path}"`)).toEqual([path])

  //single quotes
  expect(jsImportModule.pathfinder(`
    import {
    Foo as Bar,
    Qux} from '${path}'`)).toEqual([path])
})

test('Matches mixed import ... from "module" syntax', () => {
  let path = 'path' + Math.random()
  //double quotes
  expect(jsImportModule.pathfinder(`
    import Default, {
    Foo as Bar,
    Qux} from "${path}"`)).toEqual([path])

  //single quotes
  expect(jsImportModule.pathfinder(`
    import  Default, {
    Foo as Bar,
    Qux} from '${path}'`)).toEqual([path])
})


test('Matches only the right parts of the snippet', () => {
  let snippet = `
    import 'polyfill'
    import 'React' as react
    import { debounce, curry } from "lodash-es"
  `

  expect(jsImportModule.pathfinder(snippet))
    .toEqual(['polyfill', 'React', 'lodash-es'])
})
