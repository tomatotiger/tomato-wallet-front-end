import {
  Expense,
  GET_EXPENSES,
  RECORD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE
} from './types';
import { APIResponse } from '../../api/types';
import { PaginateArrayData } from '../types';

export const gotExpenses = (expensesResult: APIResponse<PaginateArrayData<Expense>, any>) => {
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
