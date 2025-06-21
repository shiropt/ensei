// コンポーネント関連の型定義

export interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  fallback?: React.ReactNode;
}

export interface FetcherProps<T> {
  loader: () => Promise<T>;
  children: (data: T) => React.ReactNode;
  fallback?: React.ReactNode;
}

export interface SearchParams {
  query?: string;
  category?: string;
  page?: string;
  limit?: string;
  sort?: string;
}