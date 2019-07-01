import { Expense } from './store/expense/types';
import { Category } from './store/category/types';

// import fetch from 'cross-fetch'

const c1 = { id: 1, name: 'food' };
const c2 = { id: 2, name: 'sport' };
const c3 = { id: 3, name: 'beauty' };
const c4 = { id: 4, name: 'home' };
const categories = [c1, c2, c3, c4];

const history = [
  { id: 1, amount: 30.11, category: c1, date: new Date('2019-05-03 09:00:00') },
  { id: 2, amount: 3.21, category: c2, date: new Date('2019-05-02 09:00:00') },
  { id: 4, amount: 7.21, category: c2, date: new Date('2019-05-01 09:00:00') },
  { id: 5, amount: 6.21, category: c4, date: new Date('2019-05-01 09:00:00') },
  { id: 6, amount: 8.92, category: c3, date: new Date('2019-04-29 09:00:00') },
  { id: 9, amount: 0.12, category: c1, date: new Date('2019-03-31 09:00:00') },
  { id: 3, amount: 9.0, category: c2, date: new Date('2019-05-02 09:00:00') },
  { id: 7, amount: 3.9, category: c1, date: new Date('2019-04-29 09:00:00') },
  { id: 8, amount: 4.7, category: c1, date: new Date('2019-04-21 09:00:00') }
];
const expense = { id: 9, amount: 0.12, category: c1, date: '2019-03-31' };

interface TomatoHttpResponse<T> extends Response {
  parsedBody?: T;
}

export function listCategory(): Promise<Category[]> {
  return fetch('http://localhost:8000/categories/')
    .then(resp => {
      return resp.json();
    })
    .then(json => {
      //TODO: add validation
      return json.results as Category[];
    });
}

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

export const listExpense = (): Promise<Expense[]> => {
  return fetch('http://localhost:8000/expense/')
    .then(resp => resp.json())
    .then((json: any) => {
      // TODO: validation
      return json.results.map(
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
      );
    });
};

export const thunkRetrieveExpense = (eid: number) => {
  return Promise.resolve(expense);
};

export const thunkGetInitialData = (uid: number) => {
  return Promise.all([listCategory(), listExpense()]).then(
    ([categories, expenses]) => ({
      categories,
      expenses
    })
  );
};
