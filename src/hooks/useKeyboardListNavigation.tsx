import React from 'react';
import { FocusableElement } from './types';

// Define constants for key codes
const KEY_ENTER = 'Enter';
const KEY_ARROW_DOWN = 'ArrowDown';
const KEY_ARROW_UP = 'ArrowUp';
const KEY_TAB = 'Tab';

/**
 * Hook for keyboard navigation through a list of elements
 * @param handleSelectItem Function to select an item
 * @param listElementId ID of the list element in DOM
 * @param onTab Function to handle the Tab key
 * @returns
 */
const useKeyboardListNavigation = <T extends FocusableElement>(
  handleSelectItem: (selectedText: string | undefined) => void,
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

  // Function to navigate to the next or previous item
  const navigateItem = (next: boolean) => {
    if (!liRef.current) {
      liRef.current = firstListItem();
      return liRef.current?.focus();
    }
    liRef.current = next
      ? (liRef.current?.nextElementSibling as T) || liRef.current
      : (liRef.current?.previousElementSibling as T) || liRef.current;
    liRef.current?.focus();
  };

  // Handling keyboard events
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<T>) => {
      switch (e.key) {
        case KEY_ENTER:
          e.preventDefault();
          handleSelectItem(liRef.current?.innerText);
          liRef.current = null;
          break;
        case KEY_ARROW_DOWN:
          e.preventDefault();
          navigateItem(true);
          break;
        case KEY_ARROW_UP:
          e.preventDefault();
          navigateItem(false);
          break;
        case KEY_TAB:
          onTab?.();
          break;
        default:
          return;
      }
    },
    [handleSelectItem, onTab],
  );

  return {
    handleKeyDown,
  };
};

export default useKeyboardListNavigation;
