import React from 'react';
import { FocusableElement } from './types';

/**
 * Hook for keyboard navigation through a list of elements
 * @param handleSelectItem Function to select an item
 * @param isNavigationShowed Whether navigation is displayed
 * @param listElementId ID of the list element in DOM
 * @param onTab Function to handle the Tab key
 * @returns
 */
const useKeyboardListNavigation = <T extends FocusableElement>(
  handleSelectItem: (selectedText: string | undefined) => void,
  isNavigationShowed: boolean,
  listElementId?: string,
  onTab?: () => void,
) => {
  const liRef = React.useRef<T | null>(null);

  // Function to return the first list item
  const firstListItem = () => {
    const liElements = Array.from(
      document.querySelectorAll(`#${listElementId}`),
    ) as T[];
    return liElements[0];
  };

  // Handling keyboard events
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
