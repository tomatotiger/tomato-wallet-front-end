import { Category, GOT_CATEGORIES, GotCategoriesAction } from './types';
import { APIResponse } from '../../api/types';

export const gotCategories = (
  categoryResult: APIResponse<Category[]>
): GotCategoriesAction => {
  return {
    type: GOT_CATEGORIES,
    categoryResult
  };
};
