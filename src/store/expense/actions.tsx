import {
  Expense,
  NewExpense,
  GET_EXPENSES,
  RECORD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE
} from './types';
import { APIResponse } from '../../api/client';

export const gotExpenses = (expensesResult: APIResponse<Expense[], any>) => {
  return {
    type: GET_EXPENSES,
    expensesResult
  };
};

export const recordExpense = (expense: Expense) => {
  return {
    type: RECORD_EXPENSE,
    payload: expense
  };
};

export const updateExpense = (expense: Expense) => {
  return {
    type: UPDATE_EXPENSE,
    payload: expense
  };
};

export const deleteExpense = (eid: number) => {
  return {
    type: DELETE_EXPENSE,
    eid
  };
};
