import { matchesCategory } from '../string'

describe('string utilities', () => {
  describe('matchesCategory', () => {
    it('should return true when filterCategory is null, undefined, or "all"', () => {
      expect(matchesCategory('J1', null)).toBe(true)
      expect(matchesCategory('J1', undefined)).toBe(true)
      expect(matchesCategory('J1', 'all')).toBe(true)
    })

    it('should match string categories exactly', () => {
      expect(matchesCategory('J1', 'J1')).toBe(true)
      expect(matchesCategory('J1', 'J2')).toBe(false)
    })

    it('should match array categories', () => {
      expect(matchesCategory(['J1', 'J2'], 'J1')).toBe(true)
      expect(matchesCategory(['J1', 'J2'], 'J2')).toBe(true)
      expect(matchesCategory(['J1', 'J2'], 'J3')).toBe(false)
    })

    it('should filter out null values from arrays', () => {
      expect(matchesCategory(['J1', null, 'J2'], 'J1')).toBe(true)
      expect(matchesCategory([null, undefined, 'J2'], 'J2')).toBe(true)
    })

    it('should return false for null or undefined itemCategories', () => {
      expect(matchesCategory(null, 'J1')).toBe(false)
      expect(matchesCategory(undefined, 'J1')).toBe(false)
    })

    it('should handle empty arrays', () => {
      expect(matchesCategory([], 'J1')).toBe(false)
      expect(matchesCategory([null, undefined], 'J1')).toBe(false)
    })
  })
})