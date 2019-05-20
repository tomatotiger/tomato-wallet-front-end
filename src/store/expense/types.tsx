import { Category } from '../category/types';

export interface Expense {
  id: number;
  amount: number;
  date: string;
  category: Category;
}

export interface ExpenseHistoryState {
  expenses: Expense[];
}

export const GET_EXPENSES = 'GET_EXPENSES';
export const RETRIEVE_EXPENSE = 'RETRIEVE_EXPENSE';
export const RECORD_EXPENSE = 'RECORD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

interface GetExpenses {
  type: typeof GET_EXPENSES;
  expenses: ExpenseHistoryState;
}

interface RecordExpenseAction {
  type: typeof RECORD_EXPENSE;
  payload: Expense;
}

interface DeleteExpenseAction {
  type: typeof DELETE_EXPENSE;
  eid: number;
}

export type ExpenseActionTypes =
  | GetExpenses
  | RecordExpenseAction
  | DeleteExpenseAction;
