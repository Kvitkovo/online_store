import SideMenu from '../SideMenu';
import React from 'react';
import Path from '../../../pages/CardPage/components/Path';

const AccountMobileMenu = ({ onCloseMobileMenu }) => {
  return (
    <>
      <Path currentPageData={{ name: 'Кабінет' }} currentPageType={'section'} />
      <SideMenu onCloseMobileMenu={onCloseMobileMenu} />
    </>
  );
};

export default AccountMobileMenu;
