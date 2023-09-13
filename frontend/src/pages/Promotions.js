import React, { useState } from 'react';
import Select from '../components/ui-kit/components/Select';

function Promotions() {
  //select
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('fromCheapToExpensive');

  const options = [
    { value: 'fromExpensiveToCheap', label: 'від дорогих до дешевих' },
    { value: 'fromCheapToExpensive', label: 'від дешевих до дорогих' },
  ];
  return (
    <div>
      <h1>Promotions</h1>
      <Select
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
        options={options}
      />
    </div>
  );
}
export default Promotions;
