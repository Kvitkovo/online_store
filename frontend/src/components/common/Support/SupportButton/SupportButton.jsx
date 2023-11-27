import React, { useState } from 'react';
import styles from './SupportButton.module.scss';
import { useModalEffect } from '../../../../hooks/useModalEffect';
import IconButton from '../../../ui-kit/components/IconButton';
import { ICONS } from '../../../ui-kit/icons';

const SupportButton = ({
  isPhoneModalOpen,
  isMessageModalOpen,
  togglePhoneButton,
  toggleMessageButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageButtonVisible, setMessageButtonVisible] = useState(false);
  const [phoneButtonVisible, setPhoneButtonVisible] = useState(false);

  const toggleButton = () => {
    if (isOpen) {
      setPhoneButtonVisible(false);
      setTimeout(() => setMessageButtonVisible(true), 2000);
    } else {
      setMessageButtonVisible(true);
      setTimeout(() => setPhoneButtonVisible(true), 100);
    }
    setIsOpen((prev) => !prev);
  };

  useModalEffect(isPhoneModalOpen, isMessageModalOpen);

  return (
    <div className={styles.supportButtonContainer}>
      <div
        className={`${styles.additionalButtons} ${
          isOpen ? styles.visible : ''
        }`}
      >
        {messageButtonVisible && (
          <div className={styles.messageButton}>
            <IconButton
              icon={<ICONS.MessageIcon />}
              isBackground={true}
              isRound={true}
              onClick={() => {
                toggleMessageButton();
                setIsOpen(false);
              }}
            />
          </div>
        )}

        {phoneButtonVisible && (
          <div className={styles.phoneButton}>
            <IconButton
              icon={<ICONS.PhoneIcon />}
              isBackground={true}
              isRound={true}
              onClick={() => {
                togglePhoneButton();
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>
      <div className={styles.mainButton}>
        {isOpen ? (
          <IconButton
            icon={<ICONS.CloseGreenIcon />}
            isRound={true}
            isRoundGreen={true}
            onClick={toggleButton}
          />
        ) : (
          <IconButton
            icon={<ICONS.QuestionIcon />}
            isBackground={true}
            isRound={true}
            onClick={toggleButton}
          />
        )}
      </div>
    </div>
  );
};
export default SupportButton;
