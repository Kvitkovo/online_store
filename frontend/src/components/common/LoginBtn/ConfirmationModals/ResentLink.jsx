import React, { useEffect, useState } from 'react';
import styles from './ConfirmationModals.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';

const ResentLink = ({ onClose }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

  const handleClick = () => {
    setIsButtonDisabled(true);
    setTimer(60);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 60000);
  };
  return (
    <div>
      <Modals type="confirmation">
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <p>Пошта не підтверджена.</p>
            <IconButton icon={<ICONS.closeMobile />} onClick={onClose} />
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
              label={`Відправити${isButtonDisabled ? ` (${timer})` : ''}`}
              padding="padding-sm"
              type="submit"
              disabled={isButtonDisabled}
              onClick={handleClick}
            />
            <Button
              variant="no-border-hovered"
              label="Скасувати"
              padding="padding-header-even"
              onClick={onClose}
            />
          </div>
        </div>
      </Modals>
    </div>
  );
};
export default ResentLink;
