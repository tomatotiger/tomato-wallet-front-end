import { Reducer } from 'redux';
import { CategoryState, SEARCH_CATEGORY, CategoryActionTypes } from './types';

const initialState: CategoryState = {
  categories: []
};

export const categoryReducer: Reducer<CategoryState, CategoryActionTypes> = (
  state = initialState,
  action: CategoryActionTypes
) => {
  switch (action.type) {
    case SEARCH_CATEGORY:
      return {
        ...state,
        ...action.categroies
      };
    default:
      return state;
  }
};
