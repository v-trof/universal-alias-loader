const pathfinders = {}

const modules = [
  require('./pathfinders/css-url'),
  require('./pathfinders/css-import'),
  require('./pathfinders/js-require'),
  require('./pathfinders/js-es6import'),
  require('./pathfinders/js-webpack-async-import')
]

modules.forEach(item => {
  if(item.syntax in pathfinders) pathfinders[item.syntax].push(item.pathfinder)
  else pathfinders[item.syntax] = [item.pathfinder]
})

module.exports = function(syntax) {
  return pathfinders[syntax] || []
}
