import React from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './ModalCatalog.module.scss';
import ButtonBack from '../ButtonBack/ButtonBack';
import { useLocation } from 'react-router-dom';

const ModalCatalog = ({ children, category, onClick }) => {
  const location = useLocation();
  const buttonBack = location.state?.from ?? `/`;

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <div className={styles.iconWraper}>
          <ButtonBack to={buttonBack} />
          <div>
            <p>{category}</p>
          </div>
          <div>
            <button
              style={{ border: 'none', background: 'transparent' }}
              onClick={onClick}
            >
              <ICONS.closeMobile />
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ModalCatalog;
