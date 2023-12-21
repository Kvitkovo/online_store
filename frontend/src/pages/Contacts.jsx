import React from 'react';
import Path from './CardPage/components/Path';

const Contacts = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Контакти' }}
        currentPageType={'section'}
      />
      <div>Контакти</div>
    </>
  );
};

export default Contacts;
