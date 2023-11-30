import { preparedUrl } from '../../utils/utils';
import { Get } from '../httpClient';

const GetCategoriesUrl = `/categories`;
const GetColorsUrl = `/colors`;
const GetProductTypesUrl = `/types`;
const GetSizesUrl = `/sizes`;

export const GetCategories = (params) => {
  return Get(preparedUrl([GetCategoriesUrl], params));
};
export const GetCategory = (id) => {
  return Get(preparedUrl(id ? [GetCategoriesUrl, id] : [GetCategoriesUrl]));
};
export const GetColors = (params) => {
  return Get(preparedUrl([GetColorsUrl], params));
};
export const GetProductTypes = (params) => {
  return Get(preparedUrl([GetProductTypesUrl], params));
};
export const GetSizes = (params) => {
  return Get(preparedUrl([GetSizesUrl], params));
};
