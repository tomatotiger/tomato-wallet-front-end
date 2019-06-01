export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

export const GET_CATEGORIES = 'GET_CATEGORIES';

interface GetCategoriesAction {
  type: typeof GET_CATEGORIES;
  categories: Category[];
}

export type CategoryActionTypes = GetCategoriesAction;
