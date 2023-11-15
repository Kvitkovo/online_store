import { preparedUrl } from '../../utils/utils';
import { Get } from '../httpClient';

const GetCategoriesUrl = `/categories`;

export const GetCategories = (params) => {
  return Get(preparedUrl([GetCategoriesUrl], params));
};
