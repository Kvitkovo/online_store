import React, { useCallback, useEffect, useState } from 'react';
import styles from './CategoryOutput.module.scss';
import Card from '../../../../common/Card';
import { ICONS } from '../../../../ui-kit/icons';
import { Link } from 'react-router-dom';
import IconButton from '../../../../ui-kit/components/IconButton';
import {
  GetDiscountedProducts,
  GetProductsCategory,
} from '../../../../../services/products/productsAccess.service';
import CardPage from '../../../../../pages/CardPage/CardPage';

const CategoryOutput = ({ title, link, categoryId }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  const getData = useCallback(
    async (title) => {
      setIsLoading(true);

      if (title === 'Акційна ціна') {
        const response = await GetDiscountedProducts({
          page: 1,
          size: 8,
        });
        setData(response.content);
      }

      if (
        title === 'Весільні букети' ||
        title === 'Квіти у кошику' ||
        title === 'Кімнатні квіти'
      ) {
        const response = await GetProductsCategory({
          page: 1,
          size: 4,
          categoryId,
        });
        setData(response.content);
      }

      setIsLoading(false);
    },
    [categoryId],
  );

  const toggleCardPage = (cardData) => {
    setSelectedCard(cardData);
  };

  useEffect(() => {
    getData(title);
  }, [title, getData]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.categoryOutput}>
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
                  onCardClick={() => toggleCardPage(card)}
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
      )}
      {selectedCard && (
        <CardPage
          cardData={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
};

export default CategoryOutput;
