import { Suspense } from "react";
import { Fallback } from "../fallback";

interface DataFetcherProps<T> {
  fetchData: () => Promise<T>;
  children: (data: T) => React.ReactNode;
  errorFallback?: React.ReactNode;
}

export const DataFetcher = async <T,>({
  fetchData,
  children,
  errorFallback,
}: DataFetcherProps<T>) => {
  try {
    const data = await fetchData();
    return <>{children(data)}</>;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("DataFetcher error:", error);
    return errorFallback || <div>データの取得に失敗しました</div>;
  }
};

// Suspense付きのラッパー
interface SuspenseFetcherProps<T> extends DataFetcherProps<T> {
  suspenseFallback?: React.ReactNode;
}

export const SuspenseDataFetcher = <T,>({
  suspenseFallback,
  ...props
}: SuspenseFetcherProps<T>) => {
  return (
    <Suspense fallback={suspenseFallback || <Fallback />}>
      <DataFetcher {...props} />
    </Suspense>
  );
};