import { CategoryState, SEARCH_CATEGORY } from './types';

export const searchCategory = (categories: CategoryState) => {
  return {
    type: SEARCH_CATEGORY,
    categories
  };
};
