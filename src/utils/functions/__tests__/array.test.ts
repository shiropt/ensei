import { generateArrayWithKeys, generateUniqueKey } from '../array'

describe('array utilities', () => {
  describe('generateUniqueKey', () => {
    it('should generate unique keys with prefix and index', () => {
      expect(generateUniqueKey('test', 0)).toBe('test-0')
      expect(generateUniqueKey('component', 5)).toBe('component-5')
      expect(generateUniqueKey('skeleton', 10)).toBe('skeleton-10')
    })

    it('should handle different prefix types', () => {
      expect(generateUniqueKey('', 1)).toBe('-1')
      expect(generateUniqueKey('a', 0)).toBe('a-0')
    })
  })

  describe('generateArrayWithKeys', () => {
    it('should generate array with correct count and keys', () => {
      const result = generateArrayWithKeys(
        3,
        (index, key) => ({ index, key }),
        'test'
      )

      expect(result).toHaveLength(3)
      expect(result[0]).toEqual({ index: 0, key: 'test-0' })
      expect(result[1]).toEqual({ index: 1, key: 'test-1' })
      expect(result[2]).toEqual({ index: 2, key: 'test-2' })
    })

    it('should handle zero count', () => {
      const result = generateArrayWithKeys(
        0,
        (index, key) => ({ index, key }),
        'empty'
      )

      expect(result).toHaveLength(0)
      expect(result).toEqual([])
    })

    it('should work with different return types', () => {
      // String return type
      const strings = generateArrayWithKeys(
        2,
        (index, key) => `Item ${index} with ${key}`,
        'string'
      )

      expect(strings).toEqual([
        'Item 0 with string-0',
        'Item 1 with string-1'
      ])

      // Number return type
      const numbers = generateArrayWithKeys(
        3,
        (index) => index * 2,
        'number'
      )

      expect(numbers).toEqual([0, 2, 4])
    })

    it('should generate unique keys for each element', () => {
      const result = generateArrayWithKeys(
        5,
        (_, key) => key,
        'unique'
      )

      expect(result).toEqual([
        'unique-0',
        'unique-1', 
        'unique-2',
        'unique-3',
        'unique-4'
      ])

      // Check all keys are unique
      const uniqueKeys = new Set(result)
      expect(uniqueKeys.size).toBe(5)
    })
  })
})