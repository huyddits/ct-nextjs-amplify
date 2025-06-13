import { useEffect, useRef, useState } from 'react';

type UseLoadMoreOptions = {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
  root?: HTMLElement | null; // 👈 optional scroll container
};

export function useLoadMore({
  loadMore,
  hasMore,
  threshold = 0.1,
  root = null,
}: UseLoadMoreOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreTriggerRef.current;
    if (!hasMore || isLoading || !node) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoading(true);
          try {
            await loadMore();
          } finally {
            setIsLoading(false);
          }
        }
      },
      {
        root,
        rootMargin: '0px',
        threshold,
      }
    );

    observerRef.current.observe(node);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasMore, isLoading, loadMore, threshold, root]);

  return {
    ref: loadMoreTriggerRef,
    isLoading,
    hasMore,
  };
}
