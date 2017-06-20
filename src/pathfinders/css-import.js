module.exports = {
  syntax: 'css',
  pathfinder: function(source) {
    const regex = /^\s*@import\s+(?:url)?\(?\s*('|")?([^'"\n\r)]*)(\1)?\s*\)?([^;]*)?;/gm

    const matches = []

    let match
    while ((match = regex.exec(source)) !== null) {
      matches.push(match[2])
    }

    return matches
  }
}
