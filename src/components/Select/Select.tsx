import React, { useState } from 'react';
import styles from './Select.module.scss';
// import cn from 'classnames';

interface SelectProps {
  selectValue: string[];
}

const Select: React.FC<SelectProps> = ({ selectValue }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className={styles['select-container']}>
      <div className={styles['select-input-container']}>
        <div className={styles['selected-options']}>
          {selectedOptions.length === 0 ? (
            <span className={styles['placeholder']}>Select an option...</span>
          ) : (
            selectedOptions.join(', ')
          )}
        </div>
        <div className={styles['dropdown-icon']}></div>
      </div>
      <ul className={styles['options-list']}>
        {selectValue.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionToggle(option)}
            className={
              selectedOptions.includes(option)
                ? styles['option-selected']
                : styles['option']
            }
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
