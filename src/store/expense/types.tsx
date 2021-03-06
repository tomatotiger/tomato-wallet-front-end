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
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

interface GetExpenses {
  type: typeof GET_EXPENSES;
  expenses: Expense[];
}

interface RecordExpenseAction {
  type: typeof RECORD_EXPENSE;
  payload: Expense;
}

interface UpdateExpenseAction {
  type: typeof UPDATE_EXPENSE;
  payload: Expense;
}

interface DeleteExpenseAction {
  type: typeof DELETE_EXPENSE;
  eid: number;
}

export type ExpenseActionTypes =
  | GetExpenses
  | RecordExpenseAction
  | UpdateExpenseAction
  | DeleteExpenseAction;
