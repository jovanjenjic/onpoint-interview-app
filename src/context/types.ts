/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContextValue {
  getCache: (key: string) => any;
  setCache: (key: string, value: any, ttl?: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
}

export interface CacheBody {
  expiry: Date;
  data: any;
}
