/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, ReactNode } from 'react';
import { CacheBody, ContextValue } from './types';

// Maximum cache size
const MAX_CACHE_SIZE = 100;

// Create a React Context for caching
const CacheContext = createContext<ContextValue | null>(null);

// CacheProvider component for managing caching
const CacheProvider = ({ children }: { children: ReactNode }) => {
  // Map to store cached data
  const map = new Map<string, CacheBody>();

  // Method to retrieve a value from the cache
  const getCache = (key: string) => {
    const cacheValue = map.get(key);
    if (!cacheValue) return null;
    if (new Date().getTime() > cacheValue.expiry.getTime()) {
      map.delete(key);
      return null;
    }
    return cacheValue.data;
  };

  // Method to set a value in the cache
  const setCache = (
    key: string,
    value: any,
    expiryDuration: number = 60 * 15,
  ) => {
    // If limit is reached, then the first element is deleted and the last one is saved
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

  // Clear the entire cache
  const clearCache = () => {
    map.clear();
  };

  // Delete a specific entry from the cache
  const deleteCache = (key: string) => {
    map.delete(key);
  };

  // Create the context value with cache-related methods
  const contextValue = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  // Provide the context value to the component tree
  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};

// Custom hook to access the cache context
export const useCache = () => {
  const context = useContext(CacheContext) as ContextValue;
  if (!context) {
    console.error('useCache hook must be used within CacheProvider.');
  }
  return context;
};

export default CacheProvider;
