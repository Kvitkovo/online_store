import React from 'react';
import Button from '../Button';
import { ICONS } from '../../icons';
import styles from './PointerButton.module.scss';

const PointerButton = ({ handleFilter }) => {
  return (
    <div className={styles.buttonContainer}>
      <ICONS.btnPointer />
      <Button label={'Показати товари'} padding={true} onClick={handleFilter} />
    </div>
  );
};

export default PointerButton;
