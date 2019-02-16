const R = require('ramda')

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const inverses = { column: {}, row: {} }
const rowIndex = R.memoizeWith(R.identity, i => {
  const rv = i + 1
  inverses.row[rv] = i
  return rv
})

const columnIndex = R.memoizeWith(R.identity, i => {
  const prefix = i >= alphabet.length
    ? columnIndex(Math.floor(i / alphabet.length) - 1) // Need to 0 index higher digits
    : ''

  const rv = prefix + alphabet[i % 26]
  inverses.column[rv] = i

  return rv
})

function indexedSheet(sheet) {
  // const index = {}
  // sheet.forEach((row, r) => {
  //   row.forEach((cell, c) => {
  //     index[columnIndex(c) + rowIndex(r)] = cell
  //   })
  // })
  // return index

  // return sheet.reduce((indexed, row, r) => ({
  //   ...indexed,
  //   ...row.reduce((cells, cell, c) => ({
  //     ...cells,
  //     ...{
  //       [columnIndex(c) + rowIndex(r)]: cell
  //     }
  //   }), {})
  // }), {})


  const indexBy = R.addIndex(R.indexBy)
  const indexedRows = sheet.map((row, r) =>
    indexBy((cell, c) => columnIndex(c) + rowIndex(r), row)
  )
  return R.mergeAll(indexedRows)
}

function deindex(indexedSheet) {
  const output = []
  R.forEachObjIndexed((cell, key) => {
    const [_, columnKey, rowKey] = /^([A-Z]+)([0-9]+)$/.exec(key)
    const rowIndex = inverses.row[rowKey]
    const columnIndex = inverses.column[columnKey]
    if (!output[rowIndex]) {
      output[rowIndex] = []
    }

    output[rowIndex][columnIndex] = cell
  }, indexedSheet)
  return output
}

module.exports = { columnIndex, rowIndex, indexedSheet, deindex }