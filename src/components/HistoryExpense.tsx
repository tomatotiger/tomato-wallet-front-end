import React, { SFC } from 'react';
import { connect } from 'react-redux';

import { Expense } from '../store/expense/types';
import { AppState } from '../store';

interface Props {
  history: Expense[];
}

const HistoryExpense: SFC<Props> = props => {
  return props.history.length < 1 ? (
    <span>No data</span>
  ) : (
    <ul className="expense-list">
      {props.history.map(expense => (
        <li key={expense.id}>
          {expense.amount} - {expense.category.name} - {expense.date}
        </li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state: AppState) => ({
  history: state.expense.expenses
});

export default connect(mapStateToProps)(HistoryExpense);
