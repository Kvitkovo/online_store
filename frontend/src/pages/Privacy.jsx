import React from 'react';
import Path from './CardPage/components/Path';

const Privacy = () => {
  return (
    <>
      <Path
        currentPageData={{ name: 'Політика конфіденційності' }}
        currentPageType={'section'}
      />
      <div>Політика конфіденційності</div>
    </>
  );
};

export default Privacy;
