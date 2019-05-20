import { Reducer } from 'redux';
import {
  ExpenseHistoryState,
  GET_EXPENSES,
  RECORD_EXPENSE,
  DELETE_EXPENSE,
  ExpenseActionTypes
} from './types';

const initialState: ExpenseHistoryState = {
  expenses: []
};

export const expenseReducer: Reducer<
  ExpenseHistoryState,
  ExpenseActionTypes
> = (state = initialState, action: ExpenseActionTypes) => {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        ...action.expenses
      };
    case RECORD_EXPENSE:
      return {
        expenses: [...state.expenses, action.payload]
      };
    case DELETE_EXPENSE:
      return {
        expenses: state.expenses.filter(e => e.id !== action.eid)
      };
    default:
      return state;
  }
};