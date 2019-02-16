const R = require('ramda')
const math = require('mathjs')

const dependencies = require('./dependencies')

const addField = (fieldName, sourceField, relation) => cell =>
  cell && { ...cell, [fieldName]: cell[sourceField] && relation(cell[sourceField]) }

const addMathNode = addField('node', 'formula', math.parse)
const addDependencies = addField('dependencies', 'node', dependencies.find)
const addComputedFields = R.pipe(addMathNode, addDependencies)

module.exports = { attach: addComputedFields }