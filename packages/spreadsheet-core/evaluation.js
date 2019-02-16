const R = require('ramda')

const computedFields = require('./computedFields')

function evaluate(indexedSheet) {
  const preppedSheet = R.map(computedFields.attach, indexedSheet)
  const valueByKey = key => {
    const cell = preppedSheet[key]
    if (cell.value) {
      return cell.value
    }

    const scope = R.mergeAll(cell.dependencies.cells.map(key => ({ [key]: valueByKey(key) })))
    return cell.node.eval(scope)
  }

  const evaluateCell = (cell, key) => {
    if (!cell) {
      return cell
    }

    return R.merge(
      cell.formula && { formula: cell.formula },
      { value: valueByKey(key).toString() },
    )
  }

  return R.mapObjIndexed(evaluateCell, preppedSheet)
}

module.exports = evaluate