import React, { useEffect, useState } from 'react';
import styles from './CardPage.module.scss';
import ItemCard from './components/ItemCard/ItemCard';
import { useParams } from 'react-router-dom';
import { GetProducts } from '../../services/products/productsAccess.service';

const CardPage = () => {
  const { myId } = useParams();
  const [productData, setProductData] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const response = await GetProducts(myId);
      setProductData(response);
    };
    getProduct();
  }, [myId]);

  return (
    <div className={styles.mainPage}>
      {productData ? <ItemCard cardData={productData} /> : <p>Loading...</p>}
    </div>
  );
};

export default CardPage;
