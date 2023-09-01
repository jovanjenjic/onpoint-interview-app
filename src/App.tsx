import React from 'react';
import Select from '@components/Select/Select';
import Button from '@components/Button/Button';
import { ApiResponse, DropdownValues } from '@components/Select/types';
import styles from './App.module.scss';
import useFetch from './hooks/useFetch';

function App() {
  const [initValue, setInitValue] = React.useState<
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

  const onSubmit = React.useCallback(() => {
    setInitValue([]);
  }, [setInitValue]);

  return (
    <div className={styles.wrapper}>
      <Select
        dropdownValues={data}
        itemKey="name"
        isLoading={loading}
        multiple={true}
        onInputChangeHandler={handleInputChange}
        initValue={initValue}
      />
      <div className={styles['button-wrapper']}>
        <Button type="primary" text="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
}

export default App;
