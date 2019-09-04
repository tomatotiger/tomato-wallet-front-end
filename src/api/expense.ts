import { Expense, NewExpense, schema } from '../store/expense/types';
import { buildUrlWithParams } from '../utils/helper';

import * as Request from './client';
import * as Decoder from './decoder';

const serializer = (expense: NewExpense): FormData => {
  const formData = new FormData();
  formData.append('amount', expense.amount.toString());
  formData.append('category_name', expense.categoryName);
  formData.append('record_time', expense.recordTime.toISOString());
  return formData;
};

export const listExpense = (page: number = 1) => {
  const url = buildUrlWithParams('expense/', { page });
  return Request.httpGet(
    url,
    Decoder.listField<Expense>(Decoder.objectField<Expense>(schema))
  );
};

export const createExpense = (expense: NewExpense) =>
  Request.httpPost(
    'expense/',
    serializer(expense),
    Decoder.objectField<Expense>(schema)
  );

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
