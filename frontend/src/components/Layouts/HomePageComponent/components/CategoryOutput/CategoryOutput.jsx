import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../../helpers/axiosInstance';
import styles from './CategoryOutput.module.scss';
import Card from '../../../../common/Card';
import { ICONS } from '../../../../ui-kit/icons';
import { Link } from 'react-router-dom';
import IconButton from '../../../../ui-kit/components/IconButton';

const CategoryOutput = ({ title, api, link }) => {
  const [data, setData] = useState();
  useEffect(() => {
    axiosInstance
      .get(api)
      .then((response) => {
        setData(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [api]);
  return (
    <div className={styles.categoryOutput}>
      <h2>{title}</h2>
      <div className={styles.cardOutput}>
        {data &&
          data.map((card) => (
            <Card
              image={
                card.images[0]
                  ? card.images[0].urlSmall
                  : './images/no_image.jpg'
              }
              title={card.title}
              discount={card.discount}
              oldPrice={card.priceWithDiscount}
              price={card.price}
              key={card.id}
            />
          ))}
      </div>
      <div className={styles.flexLink}>
        <Link to={link} className={styles.link}>
          Показати усі
        </Link>
        <IconButton icon={<ICONS.hideList />} />
      </div>
    </div>
  );
};

export default CategoryOutput;
