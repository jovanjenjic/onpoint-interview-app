import React from 'react';
import { useCache } from '@base/context';
import { debounce } from '@base/utils';
import { CacheProps } from './types';

export function useFetch<T>({ initialEnabled = true, cache }: CacheProps) {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>();
  const { getCache, setCache, deleteCache, clearCache } = useCache();

  const refetch = async (queryString: string, hard: boolean = false) => {
    if (cache?.enabled && getCache(queryString) !== null && !hard) {
      setData(getCache(queryString));
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    const filteredData = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      name: `Option ${index + 1}`,
    })).filter((item) =>
      item.name.toLowerCase().includes(queryString.toLowerCase()),
    );
    setData(filteredData as T);
    if (cache?.enabled)
      setCache(queryString, filteredData, cache.expiryDuration);
    setLoading(false);
  };

  const refetchDebounced = debounce(
    refetch,
    500,
    () => !loading && setLoading(true),
  );

  const inValidate = (queryString: string) => {
    if (queryString !== null) {
      deleteCache(queryString);
    } else {
      clearCache();
    }
  };

  React.useEffect(() => {
    if (initialEnabled) refetchDebounced('');
  }, []);

  return { loading, data, refetch: refetchDebounced, inValidate } as const;
}

export const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
