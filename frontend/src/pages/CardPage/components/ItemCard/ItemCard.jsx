import React from 'react';
import styles from './ItemCard.module.scss';
import Path from '../../components/Path';
import ItemImage from '../ItemImage';
import ItemFeatures from '../ItemFeatures/ItemFeatures';
import ItemDescription from '../ItemDescription';
import PriceAndButtons from '../PriceAndButtons/PriceAndButtons';
import Stock from '../Stock';
import Slider from '../Slider';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../redux/slices/cartSlice';

const ItemCard = ({ cardData }) => {
  const recentlyViewed = Array.from(
    JSON.parse(localStorage.getItem('recentlyViewed') || ''),
  );

  const dispatch = useDispatch();
  // const [inCart, setInCart] = useState(false);

  const handleAddToCart = ({ image, title, discount, oldPrice, price, id }) => {
    // console.log({ image, title, discount, oldPrice, price, id });
    dispatch(addToCart({ image, title, discount, oldPrice, price, id }));
    // setInCart(true);
  };

  return (
    <div className={styles.mainContainer}>
      <Path />
      <div className={styles.itemBlock}>
        <div className={styles.caption}>
          <h1 className={styles.itemName}>{cardData.title}</h1>
        </div>
        <div className={styles.cardImage}>
          <ItemImage
            image={
              cardData.images[0]
                ? cardData.images[0].url
                : '/images/no_image.jpg'
            }
            isAvailable={cardData?.available}
            discount={cardData.discount}
            isBigCard={true}
          />
        </div>

        <div className={styles.stock}>
          <Stock stockInfo={cardData?.available} />
        </div>

        <div className={styles.price}>
          <PriceAndButtons
            oldPrice={cardData.price}
            actualPrice={cardData.priceWithDiscount}
            stockInfo={cardData?.available}
            addToConstructor={cardData.allowAddToConstructor}
            addToCart={() =>
              handleAddToCart(
                cardData.images[0]
                  ? cardData.images[0]
                  : '/images/no_image.jpg',
                cardData.title,
                cardData.discount,
                cardData.oldPrice,
                cardData.price,
                cardData.id,
              )
            }
          />
        </div>
        <div className={styles.features}>
          <ItemFeatures
            type={cardData?.categoryName}
            color={cardData?.colorName}
            size={cardData?.sizeName}
          />
        </div>
        <div className={styles.description}>
          <ItemDescription description={cardData?.description} />
        </div>
      </div>
      {recentlyViewed.length > 1 && (
        <>
          <h2 className={styles.previous}>Раніше переглянуті</h2>
          <Slider data={recentlyViewed} />
        </>
      )}
    </div>
  );
};
export default ItemCard;
