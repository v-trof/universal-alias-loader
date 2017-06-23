module.exports = {
  syntax: 'css',
  pathfinder: function(source) {
    const regex = /\bfrom\s+('|")([^'"\n\r]*)(\1)/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[2])
    }

    return matches
  }
}
