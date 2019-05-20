export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

export const GET_CATEGORIES = 'SEARCH_CATEGORIES';

interface GetCategoriesAction {
  type: typeof GET_CATEGORIES;
  categroies: CategoryState;
}

export type CategoryActionTypes = GetCategoriesAction;
