describe('evaluating a sheet', () => {
  const evaluate = require('./evaluation')

  it('leaves values for constant cells', () => {
    const allConst = {
      A1: { value: 'hi' }, B1: { value: 'bye' },
      A2: { value: 'hola' }, B2: { value: 'adios' },
    }

    expect(evaluate(allConst)).toEqual(allConst)
  })

  it('computes simple formulae', () => {
    const simples = {
      A1: { formula: '2+2' }, B1: { formula: '3*4' },
      A2: { formula: '1-2*3' }, B2: { formula: '(4 - 5) ^ 6' },
    }

    expect(evaluate(simples)).toEqual({
      A1: { formula: '2+2', value: "4" }, B1: { formula: '3*4', value: "12" },
      A2: { formula: '1-2*3', value: "-5" }, B2: { formula: '(4 - 5) ^ 6', value: "1" },
    })
  })

  it('computes dependent formulae', () => {
    const dependent = {
      A1: { formula: 'A2 + 3' },
      A2: { value: '7' },
    }

    expect(evaluate(dependent)).toEqual({
      A1: { value: "10", formula: 'A2 + 3' },
      A2: { value: '7' },
    })
  })

  it('computes the values for every cell', () => {
    const complexSheet = {
      A1: { value: "Name" }, B1: { value: "Height" }, C1: { value: "Sigma" },
      A2: { value: "Alice" }, B2: { value: "163" }, C2: { formula: "B2", value: "" },
      A3: { value: "Bob" }, B3: { value: "190" }, C3: { formula: "B3+C2", value: "" },
      A4: { value: "Clara" }, B4: { value: "210" }, C4: { formula: "B4+C3", value: "" },
      // A5: null, B5: { formula: "AVG(B2:B4)", value: "" }, C5: null,
    }

    expect(evaluate(complexSheet)).toEqual({
      A1: { value: "Name" }, B1: { value: "Height" }, C1: { value: "Sigma" },
      A2: { value: "Alice" }, B2: { value: "163" }, C2: { formula: "B2", value: "163" },
      A3: { value: "Bob" }, B3: { value: "190" }, C3: { formula: "B3+C2", value: "353" },
      A4: { value: "Clara" }, B4: { value: "210" }, C4: { formula: "B4+C3", value: "563" },
      // A5: null, B5: { formula: "AVG(B2:B4)", value: "" }, C5: null
    })
  })
})