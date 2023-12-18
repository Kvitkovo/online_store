import React from 'react';
import Path from './CardPage/components/Path';

function About() {
  return (
    <>
      <Path currentPageData={{ name: 'Про Нас' }} currentPageType={'section'} />
      <div>Про Нас</div>
    </>
  );
}
export default About;
