describe('formula parsing', () => {
  const formula = require('./formula')

  it('returns the mathematical expression', () => {
    const expression = formula.extract('=1/(A2+B3)')
    expect(expression).toBe('1/(A2+B3)')
  })

  it('ignores bolded text at the end of the formula', () => {
    const expression = formula.extract('=1/(A2+B3) **12345**')
    expect(expression).toBe('1/(A2+B3)')
  })

  it('ignores whitespace at the beginning and end', () => {
    const expression = formula.extract('    =1 /( A2 + B3)    ')
    expect(expression).toBe('1 /( A2 + B3)')
  })
})