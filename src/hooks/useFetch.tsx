import React from 'react';
import { useCache } from '../context';
import { debounce, isEqual } from '../utils';
import { CacheProps } from './types';

function useFetch<T>({ initialEnabled = true, cache }: CacheProps) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>();
  const { getCache, setCache, deleteCache, clearCache } = useCache();

  const refetch = async (queryString: string, hard: boolean = false) => {
    if (cache?.enabled && getCache(queryString) !== null && !hard) {
      const cachedData = getCache(queryString);
      setData((prev) => {
        if (isEqual(prev as unknown[], cachedData)) {
          return prev;
        }
        return cachedData;
      });
    } else {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const filteredData = Array.from({ length: 10 }, (_, index) => ({
          id: index,
          name: `Option ${index + 1}`,
        })).filter((item) =>
          item.name.toLowerCase().includes(queryString.toLowerCase()),
        );
        setData(filteredData as T);
        if (cache?.enabled) {
          setCache(queryString, filteredData, cache.expiryDuration);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const inValidate = (queryString: string) => {
    if (queryString !== null) {
      deleteCache(queryString);
    } else {
      clearCache();
    }
  };

  const refetchDebounced = debounce(refetch, 300);

  React.useEffect(() => {
    if (initialEnabled) refetchDebounced('');
  }, []);

  return {
    loading,
    data,
    refetch: refetchDebounced,
    inValidate,
  } as const;
}

export default useFetch;
