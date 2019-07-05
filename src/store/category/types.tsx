import { APIResponse } from '../../api/types';

export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

export const GOT_CATEGORIES = 'GOT_CATEGORIES';

export interface GotCategoriesAction {
  type: typeof GOT_CATEGORIES;
  categoryResult: APIResponse<Category[]>;
}

export type CategoryActionTypes = GotCategoriesAction;
