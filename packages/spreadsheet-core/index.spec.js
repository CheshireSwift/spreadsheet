const emptyData = [
  [{ value: "Name" }, { value: "Height" }, { value: "Sigma" }],
  [{ value: "Alice" }, { value: "163" }, { formula: "B2", value: "" }],
  [{ value: "Bob" }, { value: "190" }, { formula: "B3+C2", value: "" }],
  [{ value: "Clara" }, { value: "210" }, { formula: "B4+C3", value: "" }],
  // [null, { formula: "AVG(B2:B4)", value: "" }, { formula: "B2", value: "" }]
]

const filledData = [
  [{ value: "Name" }, { value: "Height" }, { value: "Sigma" }],
  [{ value: "Alice" }, { value: "163" }, { formula: "B2", value: "163" }],
  [{ value: "Bob" }, { value: "190" }, { formula: "B3+C2", value: "353" }],
  [{ value: "Clara" }, { value: "210" }, { formula: "B4+C3", value: "563" }],
  // [null, { formula: "AVG(B2:B4)", value: "187.66667" }, { formula: "B2", value: "163" }]
]

describe('the computation core', () => {
  const compute = require('.')

  it('processes spreadsheet data', () => {
    expect(compute(emptyData)).toEqual(filledData)
  })
})