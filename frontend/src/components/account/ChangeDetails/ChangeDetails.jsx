import React from 'react';
import Account from '../Account';
import styles from './ChangeDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import DataForm from './DataForm';

const ChangeDetails = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/account/personal-data');
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <Account title="Редагування особистої інформації">
          <div className={styles.headerContainer}>
            <h2 className={styles.header}> Контактні дані</h2>
            <DataForm />
          </div>
        </Account>
      </div>

      <div className={styles.mobileContainer}>
        <div className={styles.mobileHeader}>
          <div>
            <IconButton icon={<ICONS.backMobile />} onClick={navigateBack} />
          </div>
          <p className={styles.accountTitle}>Редагування даних</p>
          <IconButton icon={<ICONS.closeMobile />} onClick={navigateBack} />
        </div>
        <DataForm />
      </div>
    </>
  );
};

export default ChangeDetails;
