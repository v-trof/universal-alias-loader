const path = require('path')
const webProtocolRegexp = /^(http|https|ws|wss|ftp|ftps)\:\/\//

module.exports = function(resolves, root, source, matches) {
  //converting aliases to absolute paths joined by /
  for(let alias in resolves) {
    if( ! webProtocolRegexp.test(resolves[alias]))
    resolves[alias] = path.resolve(root, resolves[alias]).split(path.sep).join('/')
  }

  let replacement = ''
  matches.forEach(match => {
    replacement = match

    for(let alias in resolves) {
      replacement = replacement.replace(alias, resolves[alias])
    }

    //this means that some aliases were found & replaced
    if(replacement !== match) source = source.replace(match, replacement)
  })

  return source
}
