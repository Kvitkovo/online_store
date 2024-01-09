import { preparedUrl } from '../../utils/utils';
import { Get } from '../httpClient';

const GetCategoriesUrl = `/categories`;
const GetFiltersInCategoryUrl = `/filter/category`;
const GetFiltersUrl = `/filter`;
const GetPricesUrl = `/filter/minMaxPrices`;

export const GetCategories = (params) => {
  return Get(preparedUrl([GetCategoriesUrl], params));
};
export const GetCategory = (id) => {
  return Get(preparedUrl(id ? [GetCategoriesUrl, id] : [GetCategoriesUrl]));
};
export const GetFiltersInCategory = (id) => {
  return Get(preparedUrl(id ? [GetFiltersInCategoryUrl, id] : [GetFiltersUrl]));
};
export const GetMinMaxPrice = (params) => {
  return Get(preparedUrl([GetPricesUrl], params));
};
