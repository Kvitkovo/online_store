import React from 'react';
import styles from './ModalCatalog.module.scss';
import { ICONS } from '../../../../ui-kit/icons';

const ParentComponent = ({ category, toggleMenu }) => {
  return (
    <div>
      <div className={styles.iconWraper}>
        <button
          style={{ border: 'none', background: 'transparent' }}
          onClick={toggleMenu}
        >
          <ICONS.back />
        </button>
        <div>
          <p>{category}</p>
        </div>
        <div>
          <button
            style={{ border: 'none', background: 'transparent' }}
            onClick={toggleMenu}
          >
            <ICONS.closeMobile />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
