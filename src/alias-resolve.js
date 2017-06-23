module.exports = function(resolves, root, source, matches) {
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
