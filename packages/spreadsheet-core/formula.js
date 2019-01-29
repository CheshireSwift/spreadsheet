const cellMatcher = /^\s*=(.+?)(?:\s*\*\*.*\*\*)?\s*$/

function extract(cellContents) {
  const matches = cellMatcher.exec(cellContents);
  return matches[1];
}

module.exports = { extract }