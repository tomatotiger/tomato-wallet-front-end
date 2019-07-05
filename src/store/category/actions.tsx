import { Category, GOT_CATEGORIES, GotCategoriesAction } from './types';
import { APIResponse } from '../../api/client';

export const gotCategories = (
  categoryResult: APIResponse<Category[], any>
): GotCategoriesAction => {
  return {
    type: GOT_CATEGORIES,
    categoryResult
  };
};
