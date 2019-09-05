import React, { SFC } from 'react';
import { connect } from 'react-redux';

import { Expense } from '../store/expense/types';
import { AppState } from '../store';
import { APIResponse } from '../api/types';
import { formatDatetime } from '../utils/helper';
import { PaginateArrayData } from '../store/types';

interface Props {
  history: APIResponse<PaginateArrayData<Expense>, any>;
}

export const HistoryExpense: SFC<Props> = props => {
  if (props.history.success) {
    return props.history.data.results.length < 1 ? (
      <span>No data</span>
    ) : (
      <ul className="expense-list">
        {props.history.data.results.map(expense => (
          <li key={expense.id}>
            {expense.amount}
            {expense.category == null
              ? ''
              : ' - ' + expense.category.name} -{' '}
            {formatDatetime(expense.recordTime)}
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
