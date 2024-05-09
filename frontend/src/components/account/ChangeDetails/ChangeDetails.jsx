import React, { useState } from 'react';
import Account from '../Account';
import styles from './ChangeDetails.module.scss';
import { useNavigate } from 'react-router-dom';
import IconButton from '../../ui-kit/components/IconButton';
import { ICONS } from '../../ui-kit/icons';
import DataForm from './DataForm';

const ChangeDetails = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 510);

  const handleResize = () => {
    setIsMobile();
  };

  window.addEventListener('resize', handleResize);

  const navigateBack = () => {
    navigate('/account/personal-data');
  };

  return (
    <>
      {isMobile ? (
        <>
          <div className={styles.mobileHeader}>
            <div>
              <IconButton
                icon={<ICONS.ArrowLeftIcon />}
                onClick={navigateBack}
              />
            </div>
            <p className={styles.accountTitle}>Редагування даних</p>
            <IconButton icon={<ICONS.closeMobile />} />
          </div>
          <DataForm />
        </>
      ) : (
        <Account title="Редагування особистої інформації">
          <div className={styles.mainContainer}>
            <h2 className={styles.header}> Контактні дані</h2>
            <DataForm />
          </div>
        </Account>
      )}
    </>
  );
};

export default ChangeDetails;
