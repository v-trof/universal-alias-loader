const path = require('path')

module.exports = function(resolves, root, source, matches) {
  //convert aliases to absolute paths joined by /
  for(let alias in resolves) {
    resolves[alias] = path.resolve(root, resolves[alias]).split(path.sep).join('/')
  }

  let replacement = ''
  matches.forEach(match => {
    replacement = match

    for(let alias in resolves) {
      replacement = replacement.replace(alias, resolves[alias])
    }

    //means some aliases were found
    if(replacement !== match) source = source.replace(match, replacement)
  })

  return source
}
