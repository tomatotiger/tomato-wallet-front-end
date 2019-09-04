import { Reducer } from 'redux';
import { Result } from '../../utils/result';
import { CategoryState, GOT_CATEGORIES, CategoryActionTypes } from './types';
import { RECORD_EXPENSE } from '../expense/types';

import { initialListData } from '../types';

const initialState: CategoryState = {
  categories: Result.success(initialListData())
};

export const categoryReducer: Reducer<CategoryState, CategoryActionTypes> = (
  state = initialState,
  action: CategoryActionTypes
) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return {
        ...state,
        categories: action.categoryResult
      };
    default:
      return state;
  }
};
