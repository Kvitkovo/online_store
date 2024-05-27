import React from 'react';
import { ICONS } from '../../../../ui-kit/icons';
import styles from './TitleMobile.module.scss';
import { useNavigate } from 'react-router-dom';

const TitleMobile = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <ICONS.ArrowLeftIcon
        className={styles.iconBlack}
        onClick={() => navigate(-1)}
      />
      <div>{title}</div>
    </div>
  );
};

export default TitleMobile;
