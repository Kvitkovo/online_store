import React from 'react';
import styles from './OrderSection.module.scss';
import Button from '../../../ui-kit/components/Button';
import { ICONS } from '../../../ui-kit/icons';

const OrderSection = ({
  step,
  currentStep,
  name,
  handleBackEdit,
  outputString,
  children,
}) => {
  return (
    <div>
      <div className={styles.subtitleBlock}>
        <h3 className={styles.subtitle}>
          <span>{step}.</span>
          {name}
        </h3>
        {currentStep > step && (
          <div className={styles.buttonChange}>
            <Button
              variant="no-border"
              label="Змінити"
              icon={<ICONS.PencilIcon />}
              onClick={() => handleBackEdit(step)}
            ></Button>
          </div>
        )}
      </div>
      {currentStep == step && <div>{children}</div>}
      {currentStep > step && (
        <div className={styles.clientDataOutput}>{outputString}</div>
      )}
    </div>
  );
};

export default OrderSection;
