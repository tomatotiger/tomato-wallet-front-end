const categories = ['food', 'sport', 'beauty'];
const history = [
  { id: 1, amount: 30.11, category: 'food', date: '2019-05-03' },
  { id: 2, amount: 3.21, category: 'soprt', date: '2019-05-02' },
  { id: 3, amount: 9.0, category: 'soprt', date: '2019-05-02' },
  { id: 4, amount: 7.21, category: 'soprt', date: '2019-05-01' },
  { id: 5, amount: 6.21, category: 'home', date: '2019-05-01' },
  { id: 6, amount: 8.92, category: 'beauty', date: '2019-04-29' },
  { id: 7, amount: 3.9, category: 'food', date: '2019-04-29' },
  { id: 8, amount: 4.7, category: 'food', date: '2019-04-21' },
  { id: 9, amount: 0.12, category: 'food', date: '2019-03-31' }
];
const expense = { id: 9, amount: 0.12, category: 'food', date: '2019-03-31' };

export const searchCategory = (keyWord: string): Promise<number> => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...categories }), 1000);
  });
};

export const recordExpense = (expense: {
  amount: number;
  category: string;
  date: string;
}) => {
  return Promise.resolve(expense);
};

export const editExpense = (expense: {
  id: number;
  amount: number;
  category: string;
  date: string;
}) => {
  return Promise.resolve(expense);
};

export const removeExpense = (eid: number) => {
  return Promise.resolve('ok');
};

export const listExpense = () => {
  return Promise.resolve({ history });
};

export const getExpense = (eid: number) => {
  return Promise.resolve(expense);
};
