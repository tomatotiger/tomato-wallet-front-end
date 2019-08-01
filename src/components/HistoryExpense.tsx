import React, { SFC } from 'react';
import { connect } from 'react-redux';

import { Expense } from '../store/expense/types';
import { AppState } from '../store';
import { APIResponse } from '../api/types';

interface Props {
  history: APIResponse<Expense[]>;
}

export const HistoryExpense: SFC<Props> = props => {
  if (props.history.success) {
    return props.history.data.length < 1 ? (
      <span>No data</span>
    ) : (
      <ul className="expense-list">
        {props.history.data.map(expense => (
          <li key={expense.id}>
            {expense.amount.toFixed(2)} - {expense.category == null ? '' : expense.category.name} - {expense.date.toString()}
          </li>
        ))}
      </ul>
    );
  } else {
    return <span>Get data failure.</span>;
  }
};

const mapStateToProps = (state: AppState) => ({
  history: state.expense.expenses
});

export default connect(mapStateToProps)(HistoryExpense);
