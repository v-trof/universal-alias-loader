module.exports = function(pathfinderModule) {
  test('Has syntax field value === css || js', () => {
    expect(['css', 'js']).toContain(pathfinderModule.syntax)
  })

  test('Has pathfinder function', () => {
    expect(pathfinderModule.pathfinder).toBeInstanceOf(Function)
  })

  test('Returns empty array if there are no matches', () => {
    expect(pathfinderModule.pathfinder('')).toEqual([])
  })
}
