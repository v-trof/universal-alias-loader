module.exports = {
  syntax: 'css',
  pathfinder: function(source) {
    const regex = /url\((?:'|")?([^'"]*)(?:'|")?\)/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[1])
    }

    return matches ? matches : []
  }
}
