import React from 'react';
import Select from '@components/Select/Select';
import Button from '@components/Button/Button';
import { ApiResponse, DropdownValues } from '@components/Select/types';
import styles from './App.module.scss';
import useFetch from './hooks/useFetch';

function App() {
  const [defaultValue, setDefaultValue] = React.useState<
    DropdownValues | DropdownValues[]
  >([
    {
      id: 1,
      name: 'Option 1',
    },
  ]);
  const {
    loading,
    data = [],
    refetch,
  } = useFetch<ApiResponse[]>({
    cache: {
      enabled: true,
      expiryDuration: 100,
    },
  });

  const handleInputChange = (newQueryString: string) => {
    refetch(newQueryString);
  };

  return (
    <div className={styles.wrapper}>
      <Select
        dropdownValues={data}
        itemKey="name"
        isLoading={loading}
        multiple={true}
        onInputChangeHandler={handleInputChange}
        defaultValue={defaultValue}
      />
      <div className={styles['button-wrapper']}>
        <Button
          type="primary"
          text="Submit"
          isLoading={loading}
          onClick={() => setDefaultValue((prev) => (prev.length ? [] : prev))}
        />
      </div>
    </div>
  );
}

export default App;
