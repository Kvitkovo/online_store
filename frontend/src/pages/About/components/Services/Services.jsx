import React from 'react';
import styles from './Services.module.scss';
import { ICONS } from '../../../../components/ui-kit/icons';

const Services = ({ data }) => {
  return (
    <ul className={styles.servicesList}>
      {data.map((service) => {
        const { id, title, description } = service;
        return (
          <li className={styles.service} key={id}>
            <div>
              <h3 className={styles.service__title}>{title}</h3>
              <p className={styles.service__description}>{description}</p>
            </div>
            <div className={styles.service__images}>
              {id === 1 && <ICONS.service1 className={styles.service__image} />}
              {id === 2 && <ICONS.service2 className={styles.service__image} />}
              {id > 2 && (
                <img
                  src={`/images/about-us/service${id}.jpg`}
                  alt={title}
                  className={styles.service__image}
                />
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Services;
