import React, { useState } from 'react';
import { cancelUserOrder } from '../../../../../services/order';
import ConfirmCancellationModal from '../ConfirmCancellationModal';
import OrderDeletedModal from '../OrderDeletedModal';
import { ICONS } from '../../../../../components/ui-kit/icons';
import Button from '../../../../ui-kit/components/Button/Button';
import { useWindowSize } from '../../../../../hooks/useWindowSize';
import IconButton from '../../../../ui-kit/components/IconButton';

const OrderDeleting = ({ orderId, onSuccessDelete }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showOrderDeletedModal, setShowOrderDeletedModal] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 510;

  const toggleShowModal = () => {
    setShowCancelModal((prev) => !prev);
  };

  const showSuccessInformationModal = () => {
    setShowOrderDeletedModal(true);
  };

  const hideSuccessInformationModal = () => {
    setShowOrderDeletedModal(false);
    onSuccessDelete();
  };

  const autoCloseModal = () => {
    setTimeout(() => {
      hideSuccessInformationModal();
    }, 3000);
  };
  const cancelOrder = () => {
    toggleShowModal();
  };

  const handleCancellOrder = async () => {
    await cancelUserOrder(orderId);
    toggleShowModal();
    showSuccessInformationModal();
    autoCloseModal();
  };

  return (
    <>
      {showCancelModal && (
        <ConfirmCancellationModal
          toggleShowModal={toggleShowModal}
          onClose={toggleShowModal}
          onCancelOrder={handleCancellOrder}
        />
      )}
      {showOrderDeletedModal && (
        <OrderDeletedModal
          toggleShowModalDeleted={hideSuccessInformationModal}
        />
      )}
      {isMobile ? (
        <Button
          variant="no-border-gray"
          label="Скасувати"
          icon={<ICONS.deleteIcon />}
          onClick={() => cancelOrder(orderId)}
        />
      ) : (
        <IconButton
          icon={<ICONS.deleteIcon />}
          onClick={() => cancelOrder(orderId)}
        ></IconButton>
      )}
    </>
  );
};

export default OrderDeleting;
