import React from 'react';
import Path from './CardPage/components/Path';

function Delivery() {
  return (
    <>
      <Path
        currentPageData={{ name: 'Доставка та оплата' }}
        currentPageType={'section'}
      />
      <div>DELIVERY</div>
    </>
  );
}
export default Delivery;
