import React, { useState } from 'react';

import SupportPhone from '../SupportPhone';
import SupportMessage from '../SupportMessage';
import SupportButton from '../SupportButton/SupportButton';

const SupportModal = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const togglePhoneButton = () => {
    setIsPhoneModalOpen((prev) => !prev);
  };
  const toggleMessageButton = () => {
    setIsMessageModalOpen((prev) => !prev);
  };
  return (
    <div>
      <SupportButton
        isPhoneModalOpen={isPhoneModalOpen}
        isMessageModalOpen={isMessageModalOpen}
        togglePhoneButton={togglePhoneButton}
        toggleMessageButton={toggleMessageButton}
      />
      {isPhoneModalOpen && (
        <SupportPhone toggleSupportPhone={togglePhoneButton} />
      )}
      {isMessageModalOpen && (
        <SupportMessage toggleSupportMessage={toggleMessageButton} />
      )}
    </div>
  );
};
export default SupportModal;
