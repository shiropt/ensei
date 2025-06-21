import { AppError, isAppError, handleError, withErrorHandling } from '../error-handling'

describe('error-handling utilities', () => {
  describe('AppError', () => {
    it('should create AppError with default status code', () => {
      const error = new AppError('Test error')
      expect(error.message).toBe('Test error')
      expect(error.statusCode).toBe(500)
      expect(error.name).toBe('AppError')
      expect(error.code).toBeUndefined()
    })

    it('should create AppError with custom status code and error code', () => {
      const error = new AppError('Not found', 404, 'NOT_FOUND')
      expect(error.message).toBe('Not found')
      expect(error.statusCode).toBe(404)
      expect(error.code).toBe('NOT_FOUND')
    })
  })

  describe('isAppError', () => {
    it('should return true for AppError instances', () => {
      const error = new AppError('Test error')
      expect(isAppError(error)).toBe(true)
    })

    it('should return false for regular Error instances', () => {
      const error = new Error('Regular error')
      expect(isAppError(error)).toBe(false)
    })

    it('should return false for non-error values', () => {
      expect(isAppError('string')).toBe(false)
      expect(isAppError(null)).toBe(false)
      expect(isAppError(undefined)).toBe(false)
      expect(isAppError({})).toBe(false)
    })
  })

  describe('handleError', () => {
    it('should handle AppError correctly', () => {
      const error = new AppError('Custom error', 400, 'BAD_REQUEST')
      const result = handleError(error)
      
      expect(result).toEqual({
        message: 'Custom error',
        statusCode: 400,
        code: 'BAD_REQUEST'
      })
    })

    it('should handle regular Error correctly', () => {
      const error = new Error('Regular error')
      const result = handleError(error)
      
      expect(result).toEqual({
        message: 'Regular error',
        statusCode: 500
      })
    })

    it('should handle unknown errors', () => {
      const result = handleError('string error')
      
      expect(result).toEqual({
        message: 'An unexpected error occurred',
        statusCode: 500
      })
    })

    it('should handle null and undefined errors', () => {
      expect(handleError(null)).toEqual({
        message: 'An unexpected error occurred',
        statusCode: 500
      })
      
      expect(handleError(undefined)).toEqual({
        message: 'An unexpected error occurred',
        statusCode: 500
      })
    })
  })

  describe('withErrorHandling', () => {
    it('should return data on successful execution', async () => {
      const successFn = jest.fn().mockResolvedValue('success data')
      const result = await withErrorHandling(successFn)
      
      expect(result).toEqual({ data: 'success data' })
      expect(successFn).toHaveBeenCalled()
    })

    it('should return error on failed execution', async () => {
      const errorFn = jest.fn().mockRejectedValue(new Error('Test error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      const result = await withErrorHandling(errorFn, 'Custom error message')
      
      expect(result).toEqual({ error: 'Test error' })
      expect(consoleSpy).toHaveBeenCalledWith('Custom error message', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should use default error message when not provided', async () => {
      const errorFn = jest.fn().mockRejectedValue(new Error('Test error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      
      await withErrorHandling(errorFn)
      
      expect(consoleSpy).toHaveBeenCalledWith('Operation failed', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should handle AppError correctly', async () => {
      const appError = new AppError('Custom app error', 400)
      const errorFn = jest.fn().mockRejectedValue(appError)
      
      const result = await withErrorHandling(errorFn)
      
      expect(result).toEqual({ error: 'Custom app error' })
    })
  })
})