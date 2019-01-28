const math = require('mathjs')

describe('dependency unwinding', () => {
  const dependencies = require('.')

  it('finds expression dependencies', () => {
    const deps = dependencies.find(math.parse('2 * A2 + B3 * AVG(Q81)'))
    expect(deps.cells).toEqual(['A2', 'B3', 'Q81'])
    expect(deps.functions).toEqual(['AVG'])
  })
})