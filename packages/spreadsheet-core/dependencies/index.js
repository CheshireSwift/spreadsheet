function find(node) {
  const symbols = node
    .filter(subnode => subnode.isSymbolNode)
    .map(subnode => subnode.name)

  const functions = node
    .filter(subnode => subnode.fn && subnode.fn.isSymbolNode)
    .map(subnode => subnode.name)

  const cells = symbols.filter(symbol => !functions.includes(symbol))

  return { cells, functions }
}
module.exports = { find }