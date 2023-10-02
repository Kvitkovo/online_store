import React from 'react';
import Discount from '../components/ui-kit/components/Discount';

function Handling() {
  return (
    <div>
      <h1>Handling</h1>
      <Discount discount={15} isBigCard={true} />
    </div>
  );
}
export default Handling;
