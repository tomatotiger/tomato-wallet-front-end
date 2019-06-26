import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox';
import Moment from 'moment';
import { connect } from 'react-redux';
import momentLocalizer from 'react-widgets-moment';
import { ThunkDispatch } from 'redux-thunk';

import { recordExpense } from '../store/expense/actions';
import { NewExpense } from '../store/expense/types';
import { AppState } from '../store';
import { createExpense } from '../api';
import {
  Field,
  defaultField,
  validField,
  invalidField,
  isValid
} from '../utils/formField';

Moment.locale('en');
momentLocalizer();

interface State {
  amount: Field<string, number>;
  category: Field<string, string>;
  date: Field<Date | undefined, Date>;
  loading: boolean;
}

interface DispatchProps {
  handleAddExpense: ({ amount, category, date }: NewExpense) => void;
}

const createDefaultState = (): State => {
  const now = new Date();
  return {
    amount: defaultField('0'),
    category: defaultField(''),
    date: validField(now, now),
    loading: false
  };
};

export class UnconnectedRecordExpense extends Component<DispatchProps, State> {
  constructor(props: DispatchProps) {
    super(props);
    this.state = createDefaultState();
  }

  setDefaultState = () => {
    this.setState(createDefaultState());
  };

  disabled = () => {
    return !this.stateValid() && !this.state.loading;
  };

  stateValid = () => {
    const { amount, category, date } = this.state;
    return isValid(amount) && isValid(category) && isValid(date);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    this.setState({ loading: true });
    e.preventDefault();
    const { amount, category, date } = this.state;
    if (isValid(amount) && isValid(category) && isValid(date)) {
      this.props.handleAddExpense({
        amount: amount.validatedValue,
        category: category.validatedValue,
        date: date.validatedValue
      });
      this.setDefaultState();
    }
  };

  amountOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    const amount = parseFloat(value);
    let amountField;
    if (isNaN(amount)) {
      amountField = invalidField(value, 'please input a number');
    } else {
      if (amount === 0) {
        amountField = invalidField(value, 'amount can not be 0');
      } else {
        amountField = validField(value, amount);
      }
    }
    this.setState({ amount: amountField });
  };

  dateOnChange = (value?: Date): void => {
    if (value) {
      this.setState({ date: validField(value, value) });
    } else {
      this.setState({ date: invalidField(value, 'please input a valid date') });
    }
  };

  categoryOnChange = (value: string): void => {
    if (!value.trim()) {
      this.setState({
        category: invalidField(value, 'category can not be empty')
      });
    } else {
      this.setState({ category: validField(value, value) });
    }
  };

  render() {
    const { amount, category, date } = this.state;
    return (
      <div className="record-expense">
        <form className="record" onSubmit={this.handleSubmit}>
          <input
            name="amount"
            id="amount"
            type="number"
            step="0.01"
            className="amount"
            placeholder="Amount"
            required
            value={amount.value}
            onChange={this.amountOnChange}
          />
          {amount.state === 'invalid' && (
            <span className="error-message" id="amount-message">
              {amount.error}
            </span>
          )}
          <Combobox
            data={['orange', 'red', 'blue', 'purple']}
            placeholder="Category"
            value={category.value}
            onChange={this.categoryOnChange}
          />
          {category.state === 'invalid' && (
            <span className="error-message" id="category-message">
              {category.error}
            </span>
          )}
          <DateTimePicker
            value={date.value}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={this.dateOnChange}
          />
          {date.state === 'invalid' && (
            <span className="error-message" id="date-message">
              {date.error}
            </span>
          )}
          <input
            name="submit"
            className="submit"
            type="submit"
            value="RECORD"
            disabled={this.disabled()}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  history: state.expense.expenses
});

const thunkAddExpense = (expense: NewExpense) => {
  return (dispatch: ThunkDispatch<{}, {}, any>, getState: Function) => {
    // const { authedUser } = getState();
    return createExpense(expense).then(e => {
      dispatch(recordExpense(e));
    });
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  handleAddExpense: (expense: NewExpense) => {
    return dispatch(thunkAddExpense(expense));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedRecordExpense);
