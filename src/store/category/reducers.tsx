import { Reducer } from 'redux';
import { CategoryState, GOT_CATEGORIES, CategoryActionTypes } from './types';

const initialState: CategoryState = {
  categories: []
};

export const categoryReducer: Reducer<CategoryState, CategoryActionTypes> = (
  state = initialState,
  action: CategoryActionTypes
) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {
        ...state,
        categoryResult: action.categoryResult
      };
    default:
      return state;
  }
};
