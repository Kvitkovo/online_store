import React, { useState } from 'react';

import SupportPhone from '../SupportPhone';
import SupportMessage from '../SupportMessage';
import SupportButton from '../SupportButton/SupportButton';
import FormSubmitted from '../FormSubmitted/FormSubmitted';

const SupportModal = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isSubmittedModalOpen, setIsSubmittedModalOpen] = useState(false);

  const togglePhoneButton = () => {
    setIsPhoneModalOpen((prev) => !prev);
  };
  const toggleMessageButton = () => {
    setIsMessageModalOpen((prev) => !prev);
  };
  const toggleSubmittedButton = () => {
    setIsSubmittedModalOpen((prev) => !prev);
  };
  return (
    <div>
      <SupportButton
        isPhoneModalOpen={isPhoneModalOpen}
        isMessageModalOpen={isMessageModalOpen}
        isSubmittedModalOpen={isSubmittedModalOpen}
        togglePhoneButton={togglePhoneButton}
        toggleMessageButton={toggleMessageButton}
        toggleSubmittedButton={toggleSubmittedButton}
      />
      {isPhoneModalOpen && (
        <SupportPhone toggleSupportPhone={togglePhoneButton} />
      )}
      {isMessageModalOpen && (
        <SupportMessage toggleSupportMessage={toggleMessageButton} />
      )}
      {isSubmittedModalOpen && (
        <FormSubmitted toggleSubmittedMessage={toggleSubmittedButton} />
      )}
    </div>
  );
};
export default SupportModal;
