import React from 'react';
// eslint-disable-next-line max-len
import styles from '../ConfirmCancellationModal/ConfirmCancellationModal.module.scss';
import Modals from '../../../../common/Modals';
import IconButton from '../../../../ui-kit/components/IconButton';
import { ICONS } from '../../../../ui-kit/icons';

const OrderDeletedModal = ({ toggleShowModalDeleted }) => {
  return (
    <Modals type="confirmationPopup">
      <div className={styles.confirmCancelOrder}>
        <div className={styles.header}>
          <p>Скасування замовлення</p>
          <IconButton
            icon={<ICONS.closeMobile onClick={toggleShowModalDeleted} />}
          />
        </div>
        <p className={styles.text}>Ваше замовлення успішно скасовано</p>
      </div>
    </Modals>
  );
};

export default OrderDeletedModal;
