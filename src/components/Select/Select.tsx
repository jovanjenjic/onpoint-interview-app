import React from 'react';
import cn from 'classnames';
import styles from './Select.module.scss';
import { SelectProps } from './types';

const Select: React.FC<SelectProps> = ({
  selectValue,
  isLoading,
  multiple,
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = React.useState<
    string[] | string
  >([]);
  const [filterText, setFilterText] = React.useState<string>('');

  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionToggle = (option: string) => {
    if (multiple) {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(
          (selectedOptions as string[]).filter((item) => item !== option),
        );
      } else {
        setSelectedOptions([...(selectedOptions as string[]), option]);
      }
    } else {
      setFilterText(option);
      setSelectedOptions(option);
    }
  };

  const onDeleteItem = (
    e: React.MouseEvent<HTMLDivElement>,
    option: string,
  ) => {
    e.stopPropagation();
    setSelectedOptions(
      (selectedOptions as string[]).filter((item) => item !== option),
    );
  };

  const onDeleteAllItems = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedOptions([]);
    setFilterText('');
  };

  return (
    <div ref={dropdownRef} className={styles['container']}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={styles['input-wrapper']}
      >
        <div className={styles['input-content']}>
          <>
            {multiple &&
              (selectedOptions as string[]).map((item) => (
                <div
                  key={item}
                  className={styles['input-content__selected-item']}
                >
                  <span>{item}</span>
                  <div
                    onClick={(e) => onDeleteItem(e, item)}
                    className={cn(styles['x-icon'])}
                  />
                </div>
              ))}
            <input
              className={styles['input-content__input']}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Type to search..."
            />
          </>
        </div>
        <>
          {isLoading && <div className={cn(styles['spinner-icon'])} />}
          <div
            onClick={(e) => onDeleteAllItems(e)}
            className={cn(styles['x-icon'])}
          />
          <div
            className={cn(
              styles['arrow-icon'],
              styles[`arrow-icon${isOpen && '--active'}`],
            )}
          />
        </>
      </div>
      {isOpen && (
        <ul className={styles['dropdown']}>
          {!isLoading &&
            selectValue.length &&
            selectValue.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionToggle(option)}
                className={cn(
                  styles['dropdown__option'],
                  (selectedOptions.includes(option) || filterText === option) &&
                    styles['dropdown__option--selected'],
                )}
              >
                {option}
              </li>
            ))}
          {!selectValue.length && !isLoading && (
            <li className={cn(styles['dropdown__option'])}>No result</li>
          )}
          {isLoading && (
            <li className={cn(styles['dropdown__option'])}>Loading...</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Select;
