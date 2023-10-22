import React, { useEffect, useState } from 'react';
import Catalog from './Catalog';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line max-len
import { GetCategories } from '../../../services/catalog/categoryAccess.service';

const CatalogFetch = ({ setIsOpen }) => {
  const { sortValue } = useParams();
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    const getCatalog = async () => {
      const response = await GetCategories(sortValue);
      setCategoryData(response);
    };
    getCatalog();
  }, [sortValue]);

  return (
    <div>
      {categoryData ? (
        <Catalog categories={categoryData} setIsOpen={setIsOpen} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CatalogFetch;
