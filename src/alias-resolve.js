module.exports = function(resolves, resourcePath, source, matches) {
  let replacement = ''
  let typeOfAlias = ''
  matches.forEach(match => {
    replacement = match

    for(let alias in resolves) {
      typeOfAlias = typeof resolves[alias]

      if(typeOfAlias === 'string') {
        replacement = replacement.replace(alias, resolves[alias])
      }
      else if(typeOfAlias === 'function' && replacement.indexOf(alias) !== -1) {
          replacement = resolves[alias](alias, replacement, resourcePath)
      }
    }

    //this means that some aliases were found & replaced
    if(replacement !== match) source = source.replace(match, replacement)
  })

  return source
}
