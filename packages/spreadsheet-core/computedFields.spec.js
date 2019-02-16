const math = require('mathjs')

describe('computed fields', () => {
  const computedFields = require('./computedFields')
  const cell = { formula: 'ADD(2,3)*C4' }
  const expectedNode = math.parse(cell.formula)
  const expectedDependencies = { cells: ['C4'], functions: ['ADD'] }

  it('adds the math node', () => {
    const { node } = computedFields.attach(cell)
    expect(node).toEqual(expectedNode)
  })

  it('adds the dependencies', () => {
    const { dependencies } = computedFields.attach(cell)
    expect(dependencies).toEqual(expectedDependencies)
  })
})