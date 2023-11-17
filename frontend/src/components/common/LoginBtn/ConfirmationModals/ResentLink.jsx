import React from 'react';
import styles from './ConfirmationModals.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const ResentLink = ({ toggleModal }) => {
  return (
    <div>
      <Modals type="confirmation">
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <p>Пошта не підтверджена.</p>
            <IconButton icon={<ICONS.closeMobile />} onClick={toggleModal} />
          </div>

          <p className={styles.email}>
            Сплив термін дії посилання для підтвердження пошти.
          </p>
          <p className={styles.textConfirmation}>
            Відправити посилання повторно?
          </p>
          <div className={styles.btnContainer}>
            <Button
              variant="primary"
              label="Відправити"
              padding="padding-sm"
              type="submit"
            />
            <Button
              variant="no-border-hovered"
              label="Скасувати"
              padding="padding-header-even"
            />
          </div>
        </div>
      </Modals>
    </div>
  );
};
export default ResentLink;
