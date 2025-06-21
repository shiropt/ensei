/**
 * 指定した数の配列を生成して、各要素にユニークなキーでマップ関数を適用
 */
export const generateArrayWithKeys = <T>(
  count: number,
  mapFn: (index: number, key: string) => T,
  keyPrefix: string
): T[] => {
  return Array.from({ length: count }, (_, i) => {
    const key = `${keyPrefix}-${i}`;
    return mapFn(i, key);
  });
};

/**
 * 配列から一意なキーを生成するヘルパー関数
 */
export const generateUniqueKey = (prefix: string, index: number): string => {
  return `${prefix}-${index}`;
};