import React, { useState } from 'react';
import styles from './Order.module.scss';
import OrderInfo from './components/OrderInfo';
import DeliveryForm from './components/DeliveryForm/DeliveryForm';
import OrderSection from './components/OrderSection';
import ContactDetails from './components/ContactDetails/ContactDetails';
import PostcardAndComment from './components/PostcardAndComment';
import Payment from './components/Payment';

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
          <div className={styles.orderBlock}>
            <OrderSection
              step={3}
              currentStep={currentStep}
              name={'Листівка та коментар'}
              outputString={orderData.postcardData?.outputString}
              handleBackEdit={handleChangeStep}
            >
              <PostcardAndComment
                postcardData={orderData.postcardData}
                setDataOnSubmit={(newPostcardData) => {
                  handleStepFinish(currentStep);
                  setOrderData({ ...orderData, postcardData: newPostcardData });
                }}
              />
            </OrderSection>
          </div>
          <div className={styles.orderBlock}>
            <OrderSection
              step={4}
              currentStep={currentStep}
              name={'Оплата'}
              outputString={orderData.paymentData?.outputString}
              handleBackEdit={handleChangeStep}
            >
              <Payment
                paymentData={orderData.paymentData}
                setDataOnSubmit={(newPaymentData) => {
                  handleStepFinish(currentStep);
                  setOrderData({ ...orderData, paymentData: newPaymentData });
                }}
              />
            </OrderSection>
          </div>
        </div>
        <OrderInfo orderData={orderData} />
      </div>
    </div>
  );
};
export default Order;
