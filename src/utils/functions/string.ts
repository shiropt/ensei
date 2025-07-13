/**
 * カテゴリフィルタリング用のヘルパー関数
 */
export const matchesCategory = (
  itemCategories: string | (string | null)[] | string[] | null | undefined,
  filterCategory: string | null | undefined,
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
