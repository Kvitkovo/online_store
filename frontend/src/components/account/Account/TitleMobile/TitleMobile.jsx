import React from 'react';
import { ICONS } from '../../../ui-kit/icons';
import styles from './TitleMobile.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const TitleMobile = ({ onShowMobileMenu }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToEdit = () => {
    navigate('/account/change-details');
  };

  const TitleDefinition = () => {
    let title = '';
    let IconComponent = null;
    let IconClickHandler = null;

    if (/\/account\/orders\/[0-9]/.test(location.pathname)) {
      const orderId = location.pathname.split('/')[3];
      title = `Замовлення № ${orderId}`;
    } else {
      switch (location.pathname) {
        case '/account':
          title = 'Контакти';
          IconComponent = ICONS.PencilIcon;
          IconClickHandler = navigateToEdit;
          break;
        case '/account/orders':
          title = 'Мої замовлення';
          break;
        case '/account/change-details':
          title = 'Редагування данних';
          IconComponent = ICONS.closeMobile;
          IconClickHandler = handleLeftIconClick;
          break;
        case '/account/change-password':
          title = 'Заміна паролю';
          IconComponent = ICONS.closeMobile;
          IconClickHandler = handleLeftIconClick;
          break;
        default:
          title = '';
          IconComponent = null;
      }
    }
    return { title, IconComponent, IconClickHandler };
  };

  const handleLeftIconClick = () => {
    if (
      location.pathname == '/account' ||
      location.pathname == '/account/orders'
    ) {
      onShowMobileMenu();
    } else {
      navigate(-1);
    }
  };

  const { title, IconComponent, IconClickHandler } = TitleDefinition();

  return (
    <div className={styles.header}>
      <ICONS.ArrowLeftIcon
        className={styles.iconBlack}
        onClick={handleLeftIconClick}
      />
      <div>{title}</div>
      <div>
        {IconComponent && (
          <IconComponent
            className={styles.titleIcon}
            onClick={IconClickHandler}
          />
        )}
      </div>
    </div>
  );
};

export default TitleMobile;
