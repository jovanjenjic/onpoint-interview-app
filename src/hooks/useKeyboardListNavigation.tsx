import React from 'react';
import { FocusableElement } from './types';

const useKeyboardListNavigation = <T extends FocusableElement>(
  handleSelectItem: (selectedText: string | undefined) => void,
  isNavigationShowed: boolean,
  listElementId?: string,
  onTab?: () => void,
) => {
  const liRef = React.useRef<T | null>(null);

  const firstListItem = () => {
    const liElements = Array.from(
      document.querySelectorAll(`#${listElementId}`),
    ) as T[];
    return liElements[0];
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<T>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const selectedText = liRef.current?.innerText;
        handleSelectItem(selectedText!);
        liRef.current = null;
      } else if (e.key === 'ArrowDown') {
        if (isNavigationShowed) {
          e.preventDefault();
          if (!liRef.current) {
            liRef.current = firstListItem();
            return liRef.current?.focus();
          }
          liRef.current =
            (liRef.current?.nextElementSibling as T) || liRef.current;
          liRef.current?.focus();
        }
      } else if (e.key === 'ArrowUp') {
        if (isNavigationShowed) {
          e.preventDefault();
          if (!liRef.current) {
            liRef.current = firstListItem();
            return liRef.current?.focus();
          }
          liRef.current =
            (liRef.current?.previousElementSibling as T) || liRef.current;
          liRef.current?.focus();
        }
      } else if (e.key === 'Tab' && isNavigationShowed) {
        onTab?.();
      }
    },
    [handleSelectItem, isNavigationShowed, onTab],
  );

  return {
    handleKeyDown,
  };
};

export default useKeyboardListNavigation;
