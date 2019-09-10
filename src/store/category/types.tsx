import { APIResponse } from '../../api/types';
import { RecordExpenseAction } from '../expense/types';
import { PaginateArrayData } from '../types';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: APIResponse<PaginateArrayData<Category>, any>;
}

export const GOT_CATEGORIES = 'GOT_CATEGORIES';

export interface GotCategoriesAction {
  type: typeof GOT_CATEGORIES;
  categoryResult: APIResponse<PaginateArrayData<Category>, any>;
}

export type CategoryActionTypes = GotCategoriesAction | RecordExpenseAction;
