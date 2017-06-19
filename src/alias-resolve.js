const path = require('path')

module.exports = function(resolves, root, source, matches) {

  for(var alias in resolves) {
    resolves[alias] = path.resolve(root, resolves[alias])
  }

  var replacement = ''
  matches.forEach(function(match) {
    replacement = match

    for(var alias in resolves) {
      replacement = replacement.replace(alias, resolves[alias])
    }

    source = source.replace(match, replacement)
  })

  return source
}
