import { Expense, NewExpense } from '../store/expense/types';
import { Category } from '../store/category/types';
import * as Request from './client';
import * as Client from './types';
import { Result } from '../utils/result';
import { buildUrlWithParams, parseUrlPraams } from '../utils/helper';
import { ListData } from '../store/types';

const serializer = (expense: NewExpense): FormData => {
  const formData = new FormData();
  formData.append('amount', expense.amount.toString());
  formData.append('category_name', expense.categoryName);
  formData.append('record_time', expense.recordTime.toISOString());
  return formData;
};

interface APIExpense {
  amount: string;
  record_time: string;
  category: Category | null;
  id: number;
}

const decodeExpense = (e: APIExpense): Result<Expense, Client.DecodeError> => {
  try {
    return Result.success({
      id: e.id,
      amount: e.amount,
      recordTime: new Date(e.record_time),
      category: e.category ? (e['category'] as Category) : null
    });
  } catch {
    return Result.failure({ message: 'decode error.' });
  }
};

const decodeExpenses = (
  es: Client.ListResponseData<APIExpense>
): Result<ListData<Expense>, Client.DecodeError> => {
  try {
    const { count, next, previous, results } = es;
    const p = previous
      ? Number(parseUrlPraams(previous.toString())['page'])
      : null;
    const n = next ? Number(parseUrlPraams(next.toString())['page']) : null;
    const pagination = {
      count,
      next: n,
      previous: p,
      current: p && n ? n - p : 1
    };
    const r = results
      .map((e: APIExpense) => {
        const result = decodeExpense(e);
        return result.success === true ? result.data : null;
      })
      .filter(de => de !== null) as Expense[];
    return Result.success({ pagination, results: r });
  } catch {
    return Result.failure({ message: 'decode error.' });
  }
};

export const listExpense = (page: number = 1) => {
  const url = buildUrlWithParams('expense/', { page });
  return Request.httpGet(url, decodeExpenses);
};

export const createExpense = (expense: NewExpense) =>
  Request.httpPost('expense/', serializer(expense), decodeExpense);

export const thunkEditExpense = (expense: {
  id: number;
  amount: number;
  category: string;
  record_time: string;
}) => {
  return Promise.resolve(expense);
};

export const thunkDeleteExpense = (uid: number) => {
  return Promise.resolve('ok');
};

// export const thunkRetrieveExpense = (eid: number) => {
//   return Promise.resolve(expense);
// };
