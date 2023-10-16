import React, { useState } from 'react';
import styles from './SupportButton.module.scss';
import IconButton from '../IconButton';
import { ICONS } from '../../icons';
import { useModalEffect } from '../../../../hooks/useModalEffect';

const SupportButton = ({
  isPhoneModalOpen,
  isMessageModalOpen,
  togglePhoneButton,
  toggleMessageButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  useModalEffect(isPhoneModalOpen, isMessageModalOpen);

  return (
    <div className={styles.supportButtonContainer}>
      <div
        className={`${styles.additionalButtons} ${
          isOpen ? styles.visible : ''
        }`}
      >
        <div>
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
        <div>
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
