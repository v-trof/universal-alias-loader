module.exports = {
  syntax: 'js',
  pathfinder: function(source) {
    const regex = /require\((?:'|")(:?[^'"]*)(?:'|")\)/gm

    const matches = []

    var match;
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[1])
    }

    console.log(matches)

    return matches ? matches : []
  }
}
