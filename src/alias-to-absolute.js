const path = require('path')
const webProtocolRegexp = /^(http|https|ws|wss|ftp|ftps)\:\/\//

module.exports = function(aliases, context) {
    resolves = Object.assign({}, aliases)
    //converting alias to absolute paths joined by /
    for(let alias in resolves) {
      if( ! webProtocolRegexp.test(resolves[alias]))
      resolves[alias] = path.resolve(context, resolves[alias]).split(path.sep).join('/')
      //backslash is used because it works everywhre unlike local machine specific path.sep
    }

    return resolves
}
