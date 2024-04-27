import React from 'react';
import styles from './Services.module.scss';
import ServiceUnit from './ServiceUnit';

const Services = ({ data }) => {
  return (
    <ul className={styles.servicesList}>
      {data.map((service) => {
        return <ServiceUnit info={service} key={service.id} />;
      })}
    </ul>
  );
};

export default Services;
