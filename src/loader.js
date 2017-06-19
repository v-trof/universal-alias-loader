const loaderUtils = require('loader-utils')
const objectAssign = require('object-assign')

const aliasResolve = require('./alias-resolve')
const importPathfinders = require('./import-pathfinders')
const identifySyntax = require('./identify-syntax')

module.exports = function (source) {
  //setup
  const defaults = {
    syntax: 'auto',
    root: this.context,
    aliases: {}
  }
  const resourcePath = this.resourcePath

  const options = objectAssign({}, defaults, loaderUtils.getOptions(this))
  if(options.syntax === 'auto') options.syntax = identifySyntax(resourcePath)

  const pathfinders = importPathfinders(options.syntax)

  //resolving
  var matches = []

  pathfinders.forEach(function(pathfinder, i) {
    matches = pathfinder(source)
    source = aliasResolve(options.aliases, options.root, source, matches)
  })

  this.callback(null, source)
}
