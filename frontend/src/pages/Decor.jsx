import React from 'react';
import Path from './CardPage/components/Path';
import DecorForm from '../components/OrderDecor/DecorForm/DecorForm';
import DecorInfo from '../components/OrderDecor/DecorInfo/DecorInfo';

const Decor = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Заявки на декор' }}
        currentPageType={'section'}
      />
      <DecorInfo />
      <DecorForm />
    </>
  );
};

export default Decor;
