import React from 'react';
import { useCache } from '../context';
import { debounce, isEqual } from '../utils';
import { CacheProps } from './types';

function useFetch<T>({ url, initialEnabled = true, cache }: CacheProps) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>();
  // Accessing caching functions from the context
  const { getCache, setCache, deleteCache, clearCache } = useCache();

  // Function to refetch data based on a query string
  const refetch = async (queryString: string, hard: boolean = false) => {
    // If caching is enabled and cached data exists, use it
    if (cache?.enabled && getCache(`${url}-${queryString}`) !== null && !hard) {
      const cachedData = getCache(`${url}-${queryString}`);
      setData((prev) =>
        isEqual(prev as unknown[], cachedData) ? prev : cachedData,
      );
      return;
    }

    setLoading(true);
    try {
      // Simulate an API call with a delay
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const filteredData = Array.from({ length: 10 }, (_, index) => ({
            id: index,
            name: `Option ${index + 1}`,
          })).filter((item) =>
            item.name.toLowerCase().includes(queryString.toLowerCase()),
          );
          resolve(filteredData);
        }, 500),
      );
      setData(response as T);
      // Set the fetched data
      if (cache?.enabled) {
        setCache(`${url}-${queryString}`, response, cache.expiryDuration);
      }
    } catch (err) {
      console.error(err);
      setData([] as T);
    } finally {
      setLoading(false);
    }
  };

  const inValidate = (queryString: string) => {
    if (queryString !== null) {
      // Delete specific cached data
      deleteCache(queryString);
    } else {
      // Clear all cached data
      clearCache();
    }
  };

  // Create a debounced version of the refetch function
  const refetchDebounced = debounce(refetch, 300);

  // Fetch data initially when enabled
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
