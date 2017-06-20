module.exports = {
  syntax: 'js',
  pathfinder: function(source) {
    const regex = /\brequire\(\s*('|"|`)([^'"`]*)(\1)\s*\)/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      //as we don't have lookback support
      if(match.index === 0 || source[match.index-1] !== '.')
      matches.push(match[2])
    }

    return matches
  }
}
