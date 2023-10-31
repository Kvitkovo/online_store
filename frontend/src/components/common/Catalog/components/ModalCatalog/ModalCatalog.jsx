import React, { memo } from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './ModalCatalog.module.scss';
import ButtonBack from '../ButtonBack/ButtonBack';
import { useLocation } from 'react-router-dom';

const ModalCatalog = memo(({ children, category }) => {
  const location = useLocation();
  const buttonBack = location.state?.from ?? `/home`;

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <div className={styles.iconWraper}>
          <ButtonBack to={buttonBack} />
          <div>
            <p>{category}</p>
          </div>
          <div>
            <button style={{ border: 'none', background: 'transparent' }}>
              <ICONS.closeMobile />
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
});

export default ModalCatalog;
