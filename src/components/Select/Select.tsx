import React, { FC, useState, useRef } from 'react';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { useClickOutside } from '../../hooks';

const Select: FC<SelectProps> = ({
  dropdownValues,
  itemKey = 'id',
  isLoading,
  multiple,
  onInputChangeHandler,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const selectRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useClickOutside(selectRef, () => setIsOpen(false));

  const handleFocusOnInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsOpen((prev) => !prev);
    }
  };

  const setInput = (value: string = '') => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  };

  const handleSelectItem = (option: string) => {
    handleFocusOnInput();
    onInputChangeHandler('');
    if (multiple) {
      setInput();
      setSelectedItems((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option)
          : [...prevSelected, option],
      );
    } else {
      setInput(option);
      setSelectedItems([option]);
    }
  };

  const onDeleteItem = (
    e: React.MouseEvent<HTMLDivElement>,
    option: string,
  ) => {
    e.stopPropagation();
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item !== option),
    );
  };

  const onDeleteAllItems = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onInputChangeHandler('');
    setSelectedItems([]);
    setInput();
  };

  const onInputChange = (value: string) => {
    onInputChangeHandler(value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={selectRef} className={styles.container}>
      <div
        onClick={handleFocusOnInput}
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
                <div
                  onClick={(e) => onDeleteItem(e, item)}
                  className={styles['x-icon']}
                />
              </div>
            ))}
          <input
            ref={inputRef}
            className={styles['input-content__input']}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type to search..."
          />
        </div>
        {isLoading && <div className={styles['spinner-icon']} />}
        <div onClick={onDeleteAllItems} className={styles['x-icon']} />
        <div
          className={`${styles['arrow-icon']} ${
            isOpen ? styles['arrow-icon--active'] : ''
          }`}
        />
      </div>
      {isOpen && (
        <ul className={styles['dropdown']}>
          {!isLoading ? (
            dropdownValues.length ? (
              dropdownValues.map((option) => (
                <li
                  key={option.id}
                  onClick={() => handleSelectItem(option[itemKey])}
                  className={`${styles['dropdown__option']} ${
                    selectedItems.includes(option[itemKey])
                      ? styles['dropdown__option--selected']
                      : ''
                  }`}
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
