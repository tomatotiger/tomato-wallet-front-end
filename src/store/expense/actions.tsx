import {
  Expense,
  NewExpense,
  GET_EXPENSES,
  RECORD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE
} from './types';

export const getExpenses = (expenses: Expense[]) => {
  return {
    type: GET_EXPENSES,
    expenses
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
