import { Category, GOT_CATEGORIES, GotCategoriesAction } from './types';
import { APIResponse } from '../../api/types';
import { ListData } from '../types';

export const gotCategories = (
  categoryResult: APIResponse<ListData<Category>, any>
): GotCategoriesAction => {
  return {
    type: GOT_CATEGORIES,
    categoryResult
  };
};
