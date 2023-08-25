import React from 'react';
import Select from '@components/Select/Select';

function App() {
  const selectValue: string[] = ['Option 1', 'Option 2', 'Option 3'];
  return (
    <div>
      <Select selectValue={selectValue} />
    </div>
  );
}

export default App;
