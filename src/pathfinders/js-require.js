module.exports = {
  syntax: 'js',
  pathfinder: function(source) {
    const regex = /require\((?:'|")([^'"]*)(?:'|")\)/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[1])
    }

    return matches ? matches : []
  }
}
