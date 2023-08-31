import React from 'react';
import Select from '@components/Select/Select';
import { useFetch } from '@hooks/index';
import Button from '@components/Button/Button';
import { ApiResponse } from '@components/Select/types';

function App() {
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
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Select
        dropdownValues={data}
        itemKey="name"
        isLoading={loading}
        multiple={true}
        onInputChangeHandler={handleInputChange}
      />
      <Button type="primary" text="Submit" onClick={() => {}} />
    </div>
  );
}

export default App;
