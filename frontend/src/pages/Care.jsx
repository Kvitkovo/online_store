import React from 'react';
import Path from './CardPage/components/Path';
import CareList from '../components/common/CareList/CareList';

const Care = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Догляд за квітами' }}
        currentPageType={'section'}
      />
      <CareList />
    </>
  );
};

export default Care;
