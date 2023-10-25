import React, { useState } from 'react';
import FormSubmitted from '../FormSubmitted/FormSubmitted';

const FormSubmittedModal = () => {
  const [isSubmittedModal, setIsSubmittedModal] = useState(false);

  const toggleSubmittedButton = () => {
    setIsSubmittedModal((prev) => !prev);
  };
  return (
    <div>
      <FormSubmitted
        isSubmittedModal={isSubmittedModal}
        toggleSubmittedButton={toggleSubmittedButton}
      />
      {isSubmittedModal && (
        <FormSubmitted toggleSubmittedButton={toggleSubmittedButton} />
      )}
    </div>
  );
};
export default FormSubmittedModal;
