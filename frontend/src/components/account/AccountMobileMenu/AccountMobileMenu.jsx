import SideMenu from '../SideMenu';
import React from 'react';
import Path from '../../../pages/CardPage/components/Path';

const AccountMobileMenu = () => {
  return (
    <>
      <Path currentPageData={{ name: 'Кабінет' }} currentPageType={'section'} />
      <SideMenu />
    </>
  );
};

export default AccountMobileMenu;
