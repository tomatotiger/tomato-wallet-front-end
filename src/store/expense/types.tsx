import { Category } from '../category/types';
import { APIResponse } from '../../api/types';
import { ListData } from '../types';

export interface Expense {
  id: number;
  amount: string;
  recordTime: Date;
  category: Category | null;
}

export interface NewExpense {
  amount: number;
  recordTime: Date;
  categoryName: string;
}

export interface ExpenseHistoryState {
  expenses: APIResponse<ListData<Expense>>;
}

export const GET_EXPENSES = 'GET_EXPENSES';
export const RETRIEVE_EXPENSE = 'RETRIEVE_EXPENSE';
export const RECORD_EXPENSE = 'RECORD_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

interface GetExpenses {
  type: typeof GET_EXPENSES;
  expensesResult: APIResponse<ListData<Expense>>;
}

export interface RecordExpenseAction {
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
