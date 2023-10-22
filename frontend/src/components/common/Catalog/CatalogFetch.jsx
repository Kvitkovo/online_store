import React, { useEffect, useState } from 'react';
import Catalog from './Catalog';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line max-len
import { GetCategories } from '../../../services/products/productsAccess.service';

const CatalogFetch = ({ setIsOpen }) => {
  const { id } = useParams();
  const [productData, setProductData] = useState();

  useEffect(() => {
    const getProduct = async () => {
      const response = await GetCategories(id);
      setProductData(response);
    };
    getProduct();
  }, [id]);

  return (
    <div>
      {productData ? (
        <Catalog categories={productData} setIsOpen={setIsOpen} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CatalogFetch;
