module.exports = function(resourcePath) {
  const splitPath = resourcePath.split('.')
  const ext = splitPath[splitPath.length - 1]

  if(ext === 'css' || ext === 'sass' || ext === 'less' || ext === 'stylus') return 'css'
  else return 'js'
}
