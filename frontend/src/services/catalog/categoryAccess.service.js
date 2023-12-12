import { preparedUrl } from '../../utils/utils';
import { Get } from '../httpClient';

const GetCategoriesUrl = `/categories`;
const GetFiltersUrl = `/filter`;
const GetFiltersInCategoryUrl = `/filter/category`;

export const GetCategories = (params) => {
  return Get(preparedUrl([GetCategoriesUrl], params));
};
export const GetCategory = (id) => {
  return Get(preparedUrl(id ? [GetCategoriesUrl, id] : [GetCategoriesUrl]));
};
export const GetFiltersInCategory = (id) => {
  return Get(preparedUrl(id ? [GetFiltersInCategoryUrl, id] : [GetFiltersUrl]));
};
