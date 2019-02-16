describe('indexing', () => {
  const indexer = require('./indexer')

  describe('rows', () => {
    it('starts at 1', () => {
      expect(indexer.rowIndex(0)).toBe(1)
    })

    it('goes up numerically', () => {
      expect(indexer.rowIndex(121)).toBe(122)
      expect(indexer.rowIndex(122)).toBe(123)
      expect(indexer.rowIndex(123)).toBe(124)
    })
  })

  describe('columns', () => {
    it('starts at A', () => {
      expect(indexer.columnIndex(0)).toBe('A')
    })

    it('goes up alphabetically', () => {
      expect(indexer.columnIndex(7)).toBe('H')
      expect(indexer.columnIndex(8)).toBe('I')
      expect(indexer.columnIndex(9)).toBe('J')
    })

    it('wraps Z, AA', () => {
      expect(indexer.columnIndex(25)).toBe('Z')
      expect(indexer.columnIndex(26)).toBe('AA')
    })

    it('wraps ZZ, AAA', () => {
      expect(indexer.columnIndex(701)).toBe('ZZ')
      expect(indexer.columnIndex(702)).toBe('AAA')
    })
  })

  describe('a sheet', () => {
    it('creates a dictionary by cell index', () => {
      expect(indexer.indexedSheet([
        [1, 2],
        [3, 4],
      ])).toEqual({
        A1: 1, B1: 2,
        A2: 3, B2: 4,
      })
    })
  })

  describe('deindexing', () => {
    it('returns an indexed sheet to arrays', () => {
      const input = [
        [1, 2],
        [3, 4],
      ]

      const indexed = indexer.indexedSheet(input)
      const deindexed = indexer.deindex(indexed)

      expect(deindexed).toEqual(input)
    })
  })
})