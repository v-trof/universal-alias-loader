const loaderUtils = require('loader-utils')

const aliasResolve = require('./alias-resolve')
const importPathfinders = require('./import-pathfinders')
const identifySyntax = require('./identify-syntax')

module.exports = function (source) {
  //setup
  const defaults = {
    syntax: 'auto',
    root: this.context,
    alias: {}
  }
  const resourcePath = this.resourcePath

  const options = Object.assign({}, defaults, loaderUtils.getOptions(this))
  if(options.syntax === 'auto') options.syntax = identifySyntax(resourcePath)

  const pathfinders = importPathfinders(options.syntax)

  //resolving
  let matches = []

  pathfinders.forEach((pathfinder, i) => {
    matches = pathfinder(source)
    source = aliasResolve(options.alias, options.root, source, matches)
  })

  this.callback(null, source)
}
