module.exports = {
  syntax: 'js',
  pathfinder: function(source) {
    const regex = /\brequire\(('|")([^'"]*)(\1)\)/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[2])
    }

    return matches ? matches : []
  }
}
