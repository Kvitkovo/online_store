import { preparedUrl } from '../../utils/utils';
import { Get, Post } from '../httpClient';

const servicedomain = '/products';
const GetDiscountedProductsUrl = `${servicedomain}/discounted`;
const GetCategoryProductsUrl = `${servicedomain}/category`;
const GetProductsFilterUrl = `${servicedomain}/filter`;
const GetProductsStocksUrl = `${servicedomain}/stocks`;
const GetProductsCategoriesUrl = `/categories`;

export const GetProducts = (id) => {
  return Get(preparedUrl(id ? [servicedomain, id] : [servicedomain]));
};
export const GetCategories = (params) => {
  return Get(preparedUrl([GetProductsCategoriesUrl], params));
};

export const GetDiscountedProducts = (params) => {
  return Get(preparedUrl([GetDiscountedProductsUrl], params));
};

export const GetProductsCategory = (params) => {
  return Get(preparedUrl([GetCategoryProductsUrl], params));
};

export const GetProductsFilter = (params) => {
  return Get(preparedUrl([GetProductsFilterUrl], params));
};

export const GetProductsStocks = (params) => {
  return Get(preparedUrl([GetProductsStocksUrl], params));
};

export const PostCreateProduct = (request) => {
  return Post(servicedomain, request);
};
