import React from 'react';
import styles from './ModalCatalog.module.scss';
import { ICONS } from '../../../../ui-kit/icons';
import { useDispatch, useSelector } from 'react-redux';
import { goBack } from '../../../../../redux/slices/catalogSlice';

const ParentComponent = ({ category, toggleMenu, closeMenu }) => {
  const { prevParents } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const handleGoBack = () => {
    if (prevParents.length === 0) {
      closeMenu();
    } else {
      dispatch(goBack());
    }
  };
  return (
    <div>
      <div className={styles.iconWraper}>
        <button
          style={{ border: 'none', background: 'transparent' }}
          onClick={handleGoBack}
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
