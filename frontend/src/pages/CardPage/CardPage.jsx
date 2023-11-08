import React, { useEffect, useState } from 'react';
import styles from './CardPage.module.scss';
import ItemCard from './components/ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import { GetProducts } from '../../services/products/productsAccess.service';

const CardPage = React.memo(() => {
  const { myId } = useParams();
  const [productData, setProductData] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const response = await GetProducts(myId);
      setProductData(response);
      const recentlyViewed =
        localStorage.getItem('recentlyViewed')?.split(',') || [];

      const wasViewedBefore = recentlyViewed.findIndex((el) => el === myId);
      if (wasViewedBefore >= 0) {
        recentlyViewed.splice(wasViewedBefore, 1);
      }
      recentlyViewed.push(myId);
      if (recentlyViewed.length > 9) {
        recentlyViewed.shift();
      }
      localStorage.setItem('recentlyViewed', recentlyViewed.join(','));
    };
    getProduct();
  }, [myId]);

  return (
    <div className={styles.mainPage}>
      {productData ? <ItemCard cardData={productData} /> : <p>Loading...</p>}
    </div>
  );
});

export default CardPage;
