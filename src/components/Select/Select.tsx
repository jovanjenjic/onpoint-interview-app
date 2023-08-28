import React, { FC, useState, useRef } from 'react';
import styles from './Select.module.scss';
import { SelectProps } from './types';
import { useClickOutside } from '@base/hooks';

const Select: FC<SelectProps> = ({ dropdownValues, isLoading, multiple }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleClickItem = (option: string) => {
    setIsOpen(false);
    if (multiple) {
      setSelectedItems((prevSelected) =>
        prevSelected.includes(option)
          ? prevSelected.filter((item) => item !== option)
          : [...prevSelected, option],
      );
    } else {
      setFilterText(option);
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
    setSelectedItems([]);
    setFilterText('');
  };

  const onInputChange = (value: string) => {
    setFilterText(value);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div ref={dropdownRef} className={styles.container}>
      <div
        onClick={() => setIsOpen(!isOpen)}
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
            className={styles['input-content__input']}
            value={filterText}
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
                  key={option}
                  onClick={() => handleClickItem(option)}
                  className={`${styles['dropdown__option']} ${
                    selectedItems.includes(option)
                      ? styles['dropdown__option--selected']
                      : ''
                  }`}
                >
                  {option}
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
