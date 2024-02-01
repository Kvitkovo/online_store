import React, { useState } from 'react';
import styles from './Order.module.scss';
import OrderInfo from './components/OrderInfo';
import DeliveryForm from './components/DeliveryForm/DeliveryForm';
import OrderSection from './components/OrderSection';
import ContactDetails from './components/ContactDetails/ContactDetails';

const Order = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({});

  const handleChangeStep = (sourceStep) => {
    setCurrentStep(sourceStep);
  };

  const handleStepFinish = (stepDone) => {
    stepDone++;
    setCurrentStep(stepDone);
  };

  return (
    <div className={styles.order}>
      <h2 className={styles.title}>Оформлення замовлення</h2>
      <div className={styles.mainGrid}>
        <div>
          <div className={styles.orderBlock}>
            <OrderSection
              step={1}
              currentStep={currentStep}
              name={'Контактні дані'}
              outputString={orderData.contactData?.outputString}
              handleBackEdit={handleChangeStep}
            >
              <ContactDetails
                contactData={orderData.contactData}
                setDataOnSubmit={(newContactData) => {
                  handleStepFinish(currentStep);
                  setOrderData({
                    ...orderData,
                    contactData: newContactData,
                  });
                }}
              />
            </OrderSection>
          </div>
          <div className={styles.orderBlock}>
            <OrderSection
              step={2}
              currentStep={currentStep}
              name={'Доставка'}
              outputString={orderData.deliveryData?.outputString}
              handleBackEdit={handleChangeStep}
            >
              <DeliveryForm
                deliveryData={orderData.deliveryData}
                setDataOnSubmit={(newDeliveryData) => {
                  handleStepFinish(currentStep);
                  setOrderData({ ...orderData, deliveryData: newDeliveryData });
                }}
              />
            </OrderSection>
          </div>
        </div>
        <OrderInfo />
      </div>
    </div>
  );
};
export default Order;
