export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
}

export const SEARCH_CATEGORY = 'SEARCH_CATEGORY';

interface SearchCategoryAction {
  type: typeof SEARCH_CATEGORY;
  categroies: CategoryState;
}

export type CategoryActionTypes = SearchCategoryAction;
