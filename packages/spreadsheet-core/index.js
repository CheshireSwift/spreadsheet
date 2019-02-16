const R = require('ramda')

const indexer = require('./indexer')
const evaluate = require('./evaluation')

module.exports = R.pipe(indexer.indexedSheet, evaluate, indexer.deindex)