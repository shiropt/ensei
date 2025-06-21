// エラーハンドリングユーティリティ

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError;
}

export function handleError(error: unknown): {
  message: string;
  statusCode: number;
  code?: string;
} {
  if (isAppError(error)) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
}

// 非同期関数のエラーハンドリングラッパー
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  errorMessage = 'Operation failed'
): Promise<{ data?: T; error?: string }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    const { message } = handleError(error);
    console.error(errorMessage, error);
    return { error: message };
  }
}