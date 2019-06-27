import { Category, GET_CATEGORIES } from './types';

export const getCategories = (categories: Category[]) => {
  return {
    type: GET_CATEGORIES,
    categories
  };
};
