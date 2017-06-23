const loaderUtils = require('loader-utils')

const aliasToAbsolute = require('./alias-to-absolute')
const aliasResolve = require('./alias-resolve')
const importPathfinders = require('./import-pathfinders')
const identifySyntax = require('./identify-syntax')

module.exports = function (source) {
  //setup
  const defaults = {
    syntax: 'auto',
    alias: {}
  }
  const resourcePath = this.resourcePath

  const options = Object.assign({}, defaults, loaderUtils.getOptions(this))
  if(options.syntax === 'auto') options.syntax = identifySyntax(resourcePath)

  const pathfinders = importPathfinders(options.syntax)
  options.alias = aliasToAbsolute(options.alias, this.context)

  //resolving
  let matches = []

  pathfinders.forEach((pathfinder, i) => {
    matches = pathfinder(source)
    source = aliasResolve(options.alias, this.context, source, matches)
  })

  this.callback(null, source)
}
