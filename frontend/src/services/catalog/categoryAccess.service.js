import { preparedUrl } from '../../utils/utils';
import { Get } from '../httpClient';

const GetCategoriesUrl = `/categories`;
const GetFiltersInCategoryUrl = `/filter/category`;
const GetFiltersUrl = `/filter`;
const GetPricesUrl = `/filter/minMaxPrices`;
const GetFiltersForDiscountedUrl = `/filter/discount`;
const GetPricesForDiscountedUrl = `/filter/discount/minMaxPrices`;

export const GetCategories = (params) => {
  return Get(preparedUrl([GetCategoriesUrl], params));
};
export const GetCategory = (id) => {
  return Get(preparedUrl(id ? [GetCategoriesUrl, id] : [GetCategoriesUrl]));
};
export const GetFiltersInCategory = (id) => {
  return Get(preparedUrl(id ? [GetFiltersInCategoryUrl, id] : [GetFiltersUrl]));
};
export const GetFiltersForDiscounted = () => {
  return Get(GetFiltersForDiscountedUrl);
};
export const GetPricesForDiscounted = () => {
  return Get(GetPricesForDiscountedUrl);
};
export const GetMinMaxPrice = (params) => {
  return Get(preparedUrl([GetPricesUrl], params));
};
