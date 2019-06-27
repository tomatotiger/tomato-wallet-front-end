// import fetch from 'cross-fetch'

const c1 = { id: 1, name: 'food' }
const c2 = { id: 2, name: 'sport' }
const c3 = { id: 3, name: 'beauty' }
const c4 = { id: 4, name: 'home' }
const categories = [c1, c2, c3, c4];

const history = [
  { id: 1, amount: 30.11, category: c1, date: '2019-05-03' },
  { id: 2, amount: 3.21, category: c2, date: '2019-05-02' },
  { id: 3, amount: 9.0, category: c2, date: '2019-05-02' },
  { id: 4, amount: 7.21, category: c2, date: '2019-05-01' },
  { id: 5, amount: 6.21, category: c4, date: '2019-05-01' },
  { id: 6, amount: 8.92, category: c3, date: '2019-04-29' },
  { id: 7, amount: 3.9, category: c1, date: '2019-04-29' },
  { id: 8, amount: 4.7, category: c1, date: '2019-04-21' },
  { id: 9, amount: 0.12, category: c1, date: '2019-03-31' }
];
const expense = { id: 9, amount: 0.12, category: c1, date: '2019-03-31' };

interface TomatoHttpResponse<T> extends Response {
  parsedBody?: T;
}

export function thunkGetCategories() {
  return Promise.resolve(categories);
}

export const thunkRecordExpense = (expense: {
  amount: number;
  category: string;
  date: string;
}) => {
  return Promise.resolve(expense);
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

export const thunkGetExpenses = (eid: number) => {
  return Promise.resolve(history);
};

export const thunkRetrieveExpense = (eid: number) => {
  return Promise.resolve(expense);
};

export const thunkGetInitialData = (uid: number) => {
  return Promise.all([thunkGetCategories(), thunkGetExpenses(uid)]).then(
    ([categories, expenses]) => ({
      categories,
      expenses
    })
  );
};
