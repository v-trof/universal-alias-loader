module.exports = {
  syntax: 'js',
  pathfinder: function(source) {
    const regex = /\brequire\(('|")([^'"]*)(\1)\)/gm

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
