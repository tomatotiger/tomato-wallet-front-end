import { Reducer } from 'redux';
import { CategoryState, GET_CATEGORIES, CategoryActionTypes } from './types';

const initialState: CategoryState = {
  categories: []
};

export const categoryReducer: Reducer<CategoryState, CategoryActionTypes> = (
  state = initialState,
  action: CategoryActionTypes
) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories]
      };
    default:
      return state;
  }
};
