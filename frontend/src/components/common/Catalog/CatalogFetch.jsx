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
      response.unshift({
        id: 0,
        name: 'Акційна ціна',
        alias: 'Sale',
        parent: null,
        metaDescription: '',
        metaKeywords: '',
        description: '',
        status: 'ACTIVE',
        icon: 'SALE',
        hasSubCategory: false,
        sortValue: 0,
      });
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
