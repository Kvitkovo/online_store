import React from 'react';
import Path from './CardPage/components/Path';

const Partner = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Стати партнером' }}
        currentPageType={'section'}
      />
      <div>Стати партнером</div>
    </>
  );
};

export default Partner;
