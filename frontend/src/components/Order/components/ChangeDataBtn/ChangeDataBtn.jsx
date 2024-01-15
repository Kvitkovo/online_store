import React from 'react';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';
import styles from './ChangeDataBtn.scss';

const ChangeDataBtn = ({ sectionState, handleChangeData }) => {
  const initialState = sectionState;

  return (
    <>
      {initialState && (
        <div className={styles.buttonChange}>
          <Button
            variant="no-border"
            label="Змінити"
            icon={<ICONS.PencilIcon />}
            onClick={() => handleChangeData()}
          ></Button>
        </div>
      )}
    </>
  );
};

export default ChangeDataBtn;
