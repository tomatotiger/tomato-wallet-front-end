import { Reducer } from 'redux';
import {
  ExpenseHistoryState,
  GET_EXPENSES,
  RECORD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  ExpenseActionTypes
} from './types';

import { APIResponse } from '../../api/client';
import { Result } from '../../utils/result';

const initialState: ExpenseHistoryState = {
  expenses: Result.success([])
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
      return {
        ...state,
        expenses: Result.map(state.expenses, data => [...data, action.payload])
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: Result.map(state.expenses, data =>
          data.map(e => {
            if (e.id !== action.payload.id) {
              return e;
            }
            return {
              ...e,
              ...action.payload
            };
          })
        )
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: Result.map(state.expenses, data =>
          data.filter(e => e.id !== action.eid)
        )
      };
    default:
      return state;
  }
};
