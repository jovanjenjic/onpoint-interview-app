import React from 'react';
import { useCache } from '../context';
import { debounce, isEqual } from '../utils';
import { CacheProps } from './types';

function useFetch<T>({ initialEnabled = true, cache }: CacheProps) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>();
  // Accessing caching functions from the context
  const { getCache, setCache, deleteCache, clearCache } = useCache();

  // Function to refetch data based on a query string
  const refetch = async (queryString: string, hard: boolean = false) => {
    // If caching is enabled and cached data exists, use it
    if (cache?.enabled && getCache(queryString) !== null && !hard) {
      const cachedData = getCache(queryString);
      setData((prev) => {
        // Check if the previous data is the same as the cached data
        if (isEqual(prev as unknown[], cachedData)) {
          return prev; // Keep the previous data
        }
        return cachedData; // Use the cached data
      });
    } else {
      setLoading(true);

      try {
        // Simulate an API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Generate sample data and filter based on the query string
        const filteredData = Array.from({ length: 10 }, (_, index) => ({
          id: index,
          name: `Option ${index + 1}`,
        })).filter((item) =>
          item.name.toLowerCase().includes(queryString.toLowerCase()),
        );
        // Set the fetched data
        setData(filteredData as T);
        // If caching is enabled, store the data in the cache
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

  // Function to invalidate cached data
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
