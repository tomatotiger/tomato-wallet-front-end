import {
  Expense,
  ExpensesState,
  GET_EXPENSES,
  RECORD_EXPENSE,
  DELETE_EXPENSE
} from './types';

export const getExpenses = (expenses: ExpensesState) => {
  return {
    type: GET_EXPENSES,
    expenses
  };
};

export const recordExpense = (newExpense: Expense) => {
  return {
    type: RECORD_EXPENSE,
    payload: newExpense
  };
};

export const deleteExpense = (eid: number) => {
  return {
    type: DELETE_EXPENSE,
    eid
  };
};
