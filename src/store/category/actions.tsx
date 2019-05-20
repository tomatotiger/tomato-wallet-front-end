import { CategoryState, GET_CATEGORIES } from './types';

export const getCategories = (categories: CategoryState) => {
  return {
    type: GET_CATEGORIES,
    categories
  };
};
