import React from 'react';
import { RecordExpense } from '../components/RecordExpense';
import HistoryExpense from '../components/HistoryExpense';

export const Homepage = () => {
  return (
    <main className="main">
      <RecordExpense />
      <HistoryExpense />
    </main>
  );
};
