/**
 * 文字列を正規化して検索しやすい形に変換する
 * ひらがな→カタカナ変換、小文字変換、空白除去などを行う
 */
export const normalize = (str: string | null | undefined): string => {
  if (!str) return "";
  
  return str
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u0300-\u036f]/g, "") // 結合文字を除去
    .replace(/[\u3041-\u3096]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) + 0x60) // ひらがな→カタカナ
    )
    .replace(/\s+/g, ""); // 空白を除去
};

/**
 * 文字列の配列から検索クエリにマッチするかチェック
 */
export const matchesSearchQuery = (
  searchFields: (string | null | undefined)[],
  query: string | null | undefined
): boolean => {
  if (!query) return true;
  
  const normalizedQuery = normalize(query);
  return searchFields.some(field => 
    normalize(field).includes(normalizedQuery)
  );
};

/**
 * カテゴリフィルタリング用のヘルパー関数
 */
export const matchesCategory = (
  itemCategories: string | (string | null)[] | string[] | null | undefined,
  filterCategory: string | null | undefined
): boolean => {
  if (!filterCategory || filterCategory === "all") return true;
  
  if (Array.isArray(itemCategories)) {
    return itemCategories.filter(Boolean).includes(filterCategory);
  }
  
  if (typeof itemCategories === "string") {
    return itemCategories === filterCategory;
  }
  
  return false;
};