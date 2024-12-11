import { useCallback, useEffect, useRef, useState } from "react";

import throttle from "lodash/throttle";

interface UseInfiniteScrollOptions<T> {
  fetchData: (cursor?: string) => Promise<{
    data: T[];
    nextCursor: string | null;
  }>;
  threshold?: number;
}

export function useInfiniteScroll<T>({
  fetchData,
  threshold = 100,
}: UseInfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const cursor = useRef<string | null>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    try {
      const { data, nextCursor } = await fetchData(cursor.current || undefined);
      setItems((prev) => [...prev, ...data]);
      cursor.current = nextCursor;
      setHasMore(!!nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, hasMore, isLoading]);

  const throttledLoadMore = throttle(loadMore, 500);

  const handleScroll = useCallback(
    (containerRef: HTMLElement | null) => {
      if (!containerRef) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef;
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        throttledLoadMore();
      }
    },
    [throttledLoadMore, threshold],
  );

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    handleScroll,
  };
}
