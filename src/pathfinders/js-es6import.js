module.exports = {
  syntax: 'js',
  pathfinder: function(source) {
    //yeah, this one is quite huge
    const regex = /\bimport\s+(?:('|"|`)([^'"`]*)(\1)(?:\s+as\s+)?|(?:([a-z]|[A-Z]|[0-9]|[{}*]|\s|,)*)\s+('|"|`)([^'"`]*)(\5))/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      if(match[2] !== void 0) matches.push(match[2])
      else matches.push(match[6])
    }

    return matches
  }
}
