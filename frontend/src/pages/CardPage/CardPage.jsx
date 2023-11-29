import React, { useCallback, useEffect, useState } from 'react';
import styles from './CardPage.module.scss';
import ItemCard from './components/ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import { GetProducts } from '../../services/products/productsAccess.service';

const CardPage = React.memo(() => {
  const { myId } = useParams();
  const [productData, setProductData] = useState();
  const getProduct = useCallback(async () => {
    const response = await GetProducts(myId);
    setProductData(response);
    const storedRecentlyViewed = Array.from(
      JSON.parse(localStorage.getItem('recentlyViewed')) || [],
    );

    const filteredRecentlyViewed = storedRecentlyViewed.filter((item) => {
      return item !== +myId;
    });

    if (response) {
      filteredRecentlyViewed.push(myId);
    }

    if (filteredRecentlyViewed.length > 9) {
      filteredRecentlyViewed.shift();
    }

    localStorage.setItem(
      'recentlyViewed',
      JSON.stringify(filteredRecentlyViewed),
    );
  }, [myId]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return (
    <div className={styles.mainPage}>
      {productData ? <ItemCard cardData={productData} /> : <p>Loading...</p>}
    </div>
  );
});

export default CardPage;
