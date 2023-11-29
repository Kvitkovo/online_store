import React from 'react';
import Path from './CardPage/components/Path';

const Care = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Догляд за квітами' }}
        currentPageType={'section'}
      />
      <div>Догляд за квітами</div>
    </>
  );
};

export default Care;
