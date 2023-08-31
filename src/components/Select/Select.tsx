import React from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import useKeyboardListNavigation from '../../hooks/useKeyboardListNavigation';
import styles from './Select.module.scss';
import { DropdownValues, SelectProps } from './types';

const Select: React.FC<SelectProps> = ({
  dropdownValues,
  itemKey = 'id',
  isLoading,
  multiple,
  onInputChangeHandler,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

  const selectRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (!defaultValue) return;
    if (Array.isArray(defaultValue)) {
      setSelectedItems(
        defaultValue.map((value: DropdownValues) => value[itemKey]),
      );
    } else {
      setSelectedItems(defaultValue[itemKey] ? [defaultValue[itemKey]] : []);
    }
    setInputValue();
  }, [defaultValue]);

  const setInputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const setInputValue = (value: string = '') => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  };

  const handleSelectItem = (newItem: string | undefined) => {
    setIsOpen((prev) => !prev);
    if (newItem) {
      setInputFocus();
      onInputChangeHandler('');
      if (multiple) {
        setInputValue();
        setSelectedItems((prevSelected) =>
          prevSelected.includes(newItem)
            ? prevSelected.filter((item) => item !== newItem)
            : [...prevSelected, newItem],
        );
      } else {
        setInputValue(newItem);
        setSelectedItems([newItem]);
      }
    }
  };

  const onDeleteItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    option: string,
  ) => {
    e.stopPropagation();
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item !== option),
    );
  };

  const onDeleteAllItems = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onInputChangeHandler('');
    setInputValue();
    setInputFocus();
    selectedItems.length && setSelectedItems([]);
  };

  const onInputChange = (value: string) => {
    onInputChangeHandler(value);
    !isOpen && setIsOpen(true);
  };

  const { handleKeyDown } = useKeyboardListNavigation(
    handleSelectItem,
    isOpen,
    'li-elements',
    () => setIsOpen(false),
  );
  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <div ref={selectRef} className={styles.container}>
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
          setInputFocus();
        }}
        className={`${styles['input-wrapper']} ${
          isOpen ? styles['input-wrapper--open'] : ''
        }`}
      >
        <div className={styles['input-content']}>
          {multiple &&
            selectedItems.map((item) => (
              <div
                key={item}
                className={styles['input-content__selected-item']}
              >
                <span>{item}</span>
                <button
                  aria-label={`Delete ${item}`}
                  onClick={(e) => {
                    onDeleteItem(e, item);
                    setInputFocus();
                  }}
                  className={styles['x-icon']}
                />
              </div>
            ))}
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className={styles['input-content__input']}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
        {isLoading && <div className={styles['spinner-icon']} />}
        <button
          aria-label="Clear options"
          onClick={onDeleteAllItems}
          className={styles['x-icon']}
        />
        <button
          aria-label="Open dropdown"
          className={`${styles['arrow-icon']} ${
            isOpen ? styles['arrow-icon--active'] : ''
          }`}
        />
      </div>
      {isOpen && (
        <ul
          className={styles['dropdown']}
          role="listbox"
          aria-multiselectable={true}
        >
          {!isLoading ? (
            dropdownValues.length ? (
              dropdownValues.map((option) => (
                <li
                  id="li-elements"
                  tabIndex={0}
                  onKeyDown={handleKeyDown}
                  key={option.id}
                  onClick={() => handleSelectItem(option[itemKey])}
                  className={`${styles['dropdown__option']} ${
                    selectedItems.includes(option[itemKey])
                      ? styles['dropdown__option--selected']
                      : ''
                  }`}
                  aria-selected={selectedItems.includes(option[itemKey])}
                  aria-label={
                    selectedItems.includes(option[itemKey])
                      ? `${option[itemKey]} selected`
                      : option[itemKey]
                  }
                >
                  {option[itemKey]}
                </li>
              ))
            ) : (
              <li
                className={`${styles['dropdown__option']} ${styles['dropdown__option--no-result']}`}
              >
                No result
              </li>
            )
          ) : (
            <li
              className={`${styles['dropdown__option']} ${styles['dropdown__option--loading']}`}
            >
              Loading...
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;
