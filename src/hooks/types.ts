export interface CacheProps {
  initialEnabled?: boolean;
  cache?: {
    enabled?: boolean;
    expiryDuration?: number;
  };
}
