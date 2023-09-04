export interface CacheProps {
  url: string;
  initialEnabled?: boolean;
  cache?: {
    enabled?: boolean;
    expiryDuration?: number;
  };
}

export type FocusableElement = HTMLElement & { focus: () => void };
