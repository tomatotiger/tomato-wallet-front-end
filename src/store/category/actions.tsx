import { Category, GOT_CATEGORIES, GotCategoriesAction } from './types';
import { APIResponse } from '../../api/types';
import { PaginateArrayData } from '../types';

export const gotCategories = (
  categoryResult: APIResponse<PaginateArrayData<Category>, any>
): GotCategoriesAction => {
  return {
    type: GOT_CATEGORIES,
    categoryResult
  };
};
