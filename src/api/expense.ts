import { Expense } from '../store/expense/types';
import { Category } from '../store/category/types';
import { httpGet } from './client';
import { Result } from '../utils/result';

export const createExpense = (expense: {
  amount: number;
  category: string;
  date: Date;
}) => {
  return Promise.resolve({ ...expense, id: 1, category: { id: 1, name: 'c' } });
};

export const thunkEditExpense = (expense: {
  id: number;
  amount: number;
  category: string;
  date: string;
}) => {
  return Promise.resolve(expense);
};

export const thunkDeleteExpense = (uid: number) => {
  return Promise.resolve('ok');
};

export const listExpense = () => {
  return httpGet(
    'expense/',
    (json: any) =>
    Result.success(
      json.results.map(
        (e: {
          amount: string;
          record_time: string;
          category: Category | null;
          id: number;
        }): Expense => ({
          amount: parseFloat(e.amount),
          date: new Date(e.record_time),
          category: e.category,
          id: e.id
        })
      )
    )
  );
};
// export const thunkRetrieveExpense = (eid: number) => {
//   return Promise.resolve(expense);
// };
