/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, ReactNode } from 'react';
import { CacheBody, ContextValue } from './types';

const MAX_CACHE_SIZE = 100;

const CacheContext = createContext<ContextValue | null>(null);

const CacheProvider = ({ children }: { children: ReactNode }) => {
  const map = new Map<string, CacheBody>();

  const getCache = (key: string) => {
    const cacheValue = map.get(key);
    if (!cacheValue) return null;
    if (new Date().getTime() > cacheValue.expiry.getTime()) {
      map.delete(key);
      return null;
    }
    return cacheValue.data;
  };

  const setCache = (
    key: string,
    value: any,
    expiryDuration: number = 60 * 15,
  ) => {
    if (map.size >= MAX_CACHE_SIZE) {
      const oldestKey = map.keys().next().value;
      map.delete(oldestKey);
    }

    const expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + expiryDuration);
    map.set(key, {
      expiry: expiryTime,
      data: value,
    });
  };

  const clearCache = () => {
    map.clear();
  };

  const deleteCache = (key: string) => {
    map.delete(key);
  };

  const contextValue = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};

export const useCache = () => {
  return useContext(CacheContext) as ContextValue;
};

export default CacheProvider;
