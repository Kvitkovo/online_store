import React, { useEffect, useState } from 'react';
import styles from './ConfirmationModals.module.scss';
import Modals from '../../Modals';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';
import Button from '../../../ui-kit/components/Button';
import axios from 'axios';

const ResentLink = ({ email, password, onClose }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleClick = async () => {
    setIsButtonDisabled(true);
    setTimer(60);

    try {
      const response = await axios.post(
        'https://api.imperiaholoda.com.ua:4446/v1/auth/send-email-confirm-code',
        {
          email: email,
          password: password,
        },
      );
      alert(response);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 60000);
    } catch (error) {
      console.error('Error sending confirmation link:', error);
      setIsButtonDisabled(false);
    }
  };

  useEffect(() => {
    let interval;
    if (isButtonDisabled) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isButtonDisabled]);

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
