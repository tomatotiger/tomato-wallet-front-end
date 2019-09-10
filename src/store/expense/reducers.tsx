import { Reducer } from 'redux';
import {
  ExpenseHistoryState,
  GET_EXPENSES,
  RECORD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  ExpenseActionTypes
} from './types';

import { Result } from '../../utils/result';
import { initialListData } from '../types';

const initialState: ExpenseHistoryState = {
  expenses: Result.success(initialListData())
};

export const expenseReducer: Reducer<
  ExpenseHistoryState,
  ExpenseActionTypes
> = (state = initialState, action: ExpenseActionTypes) => {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.expensesResult
      };
    case RECORD_EXPENSE:
      if (
        state.expenses.success &&
        state.expenses.data.pagination.current === 1
      ) {
        return {
          ...state,
          expenses: {
            ...state.expenses,
            data: {
              ...state.expenses.data,
              results: [...state.expenses.data.results, action.payload]
            }
          }
        };
      } else {
        return state;
      }
    case UPDATE_EXPENSE:
      return state;
    case DELETE_EXPENSE:
      return state;
    default:
      return state;
  }
};
