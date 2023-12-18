import React from 'react';
import Path from './CardPage/components/Path';

const Faq = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Поширені запитання' }}
        currentPageType={'section'}
      />
      <div>Поширені запитання</div>;
    </>
  );
};

export default Faq;
