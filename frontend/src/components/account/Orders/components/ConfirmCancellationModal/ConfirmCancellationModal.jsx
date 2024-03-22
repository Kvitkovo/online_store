import React from 'react';
import styles from './ConfirmCancellationModal.module.scss';
import Modals from '../../../../common/Modals';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';

const CancelOrderConfirmation = ({ toggleShowModal }) => {
  return (
    <Modals type="confirmationPopup">
      <div className={styles.confirmCancelOrder}>
        <div className={styles.header}>
          <p>Скасування замовлення</p>
          <IconButton icon={<ICONS.closeMobile onClick={toggleShowModal} />} />
        </div>
        <p className={styles.text}>
          Ви дійсно бажаете скасувати ваше замовлення?
        </p>
        <div className={styles.buttonsBlock}>
          <button>
            Так <ICONS.yesIcon />
          </button>
          <button>
            Ні <ICONS.deleteIcon />
          </button>
        </div>
      </div>
    </Modals>
  );
};
export default CancelOrderConfirmation;
