import React, { useState } from 'react';
import { cancelUserOrder } from '../../../../services/order';
import ConfirmCancellationModal from '../components/ConfirmCancellationModal';
import OrderDeletedModal from '../components/OrderDeletedModal';
import { ICONS } from '../../../ui-kit/icons';
import IconButton from '../../../ui-kit/components/IconButton';

const OrderDeleting = ({ orderId, onSuccessDelete }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showOrderDeletedModal, setShowOrderDeletedModal] = useState(false);

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
      <IconButton
        icon={<ICONS.deleteIcon />}
        onClick={() => cancelOrder(orderId)}
      ></IconButton>
    </>
  );
};

export default OrderDeleting;
