import React from 'react';

/**
 * Hook to detect clicks outside a specified ref element
 * @param ref Reference to the element to detect clicks outside of
 * @param callback Callback function to be called when a click outside is detected
 */
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  React.useEffect(() => {
    // Function to handle clicks outside the referenced element
    function handleClickOutside(event: MouseEvent) {
      // Check if the referenced element exists and if the click is outside of it
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    // Add a mousedown event listener to the document
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
