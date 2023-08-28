import React from 'react';
import Select from '@components/Select/Select';
import Button from './components/Button/Button';

const dropdownValues: string[] = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
];
function App() {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Button type="primary" text="Submit" onClick={() => {}} />
      <Select
        dropdownValues={dropdownValues}
        isLoading={false}
        multiple={true}
      />
    </div>
  );
}

export default App;
