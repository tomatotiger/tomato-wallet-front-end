import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox';
import Moment from 'moment';
import { connect } from 'react-redux';
import momentLocalizer from 'react-widgets-moment';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { recordExpense } from '../store/expense/actions';
import {
  NewExpense,
  Expense,
  ExpenseActionTypes
} from '../store/expense/types';
import { AppState } from '../store';
import { Result } from '../utils/result';
import * as Client from '../api/types';
import { createExpense } from '../api/expense';
import {
  Field,
  defaultField,
  validField,
  invalidField,
  isValid
} from '../utils/formField';

Moment.locale('en');
momentLocalizer();

interface SubmitInitial {
  state: 'initial';
}

interface SubmitSucceed {
  state: 'succeed';
  message: string;
}

interface Submitting {
  state: 'submitting';
}

interface SubmitFailed {
  state: 'failed';
  message: string;
}

interface State {
  amount: Field<string, number>;
  category: Field<string, string>;
  recordTime: Field<Date | undefined, Date>;
  submitState: SubmitInitial | Submitting | SubmitSucceed | SubmitFailed;
}

interface StateProps {
  categories: string[];
}
interface DispatchProps {
  handleAddExpense: (e: NewExpense) => any;
}
type Props = StateProps & DispatchProps;

const createDefaultState = (): State => {
  const now = new Date();
  return {
    amount: defaultField('0'),
    category: defaultField(''),
    recordTime: validField(now, now),
    submitState: { state: 'initial' }
  };
};

export class UnconnectedRecordExpense extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = createDefaultState();
  }

  setDefaultState = () => {
    this.setState(createDefaultState());
  };

  disabled = () => {
    return !this.stateValid() || this.state.submitState.state === 'submitting';
  };

  stateValid = () => {
    const { amount, category, recordTime } = this.state;
    return isValid(amount) && isValid(category) && isValid(recordTime);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    this.setState({ submitState: { state: 'submitting' } });
    e.preventDefault();
    const { amount, category, recordTime } = this.state;
    if (isValid(amount) && isValid(category) && isValid(recordTime)) {
      this.props
        .handleAddExpense({
          amount: amount.validatedValue,
          categoryName: category.validatedValue,
          recordTime: recordTime.validatedValue
        })
        .then((r: Result<Expense, Client.APIError>) => {
          if (r.success) {
            this.setState({
              submitState: { state: 'succeed', message: 'add record succeed.' }
            });
          } else {
            this.setState({
              submitState: { state: 'failed', message: r.error.kind }
            });
          }
        });
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
      this.setState({ recordTime: validField(value, value) });
    } else {
      this.setState({ recordTime: invalidField(value, 'please input a valid date') });
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
    const { amount, category, recordTime, submitState } = this.state;
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
            data={this.props.categories}
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
            value={recordTime.value}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={this.dateOnChange}
          />
          {recordTime.state === 'invalid' && (
            <span className="error-message" id="date-message">
              {recordTime.error}
            </span>
          )}

          <input
            name="submit"
            className="submit"
            type="submit"
            value="RECORD"
            disabled={this.disabled()}
          />

          {submitState.state === 'succeed' && (
            <span className="message" id="submit-message">
              {submitState.message}
            </span>
          )}

          {submitState.state === 'failed' && (
            <span className="error-message" id="submit-message">
              {submitState.message}
            </span>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): StateProps => ({
  categories: []
});

const thunkAddExpense = (
  expense: NewExpense
): ThunkAction<Promise<any>, {}, {}, ExpenseActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, any>): Promise<any> => {
    return createExpense(expense).then(r => {
      if (r.success) {
        dispatch(recordExpense(r.data));
      }
      return r;
    });
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<{}, {}, any>
): DispatchProps => ({
  handleAddExpense: (e: NewExpense) => {
    return dispatch(thunkAddExpense(e));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedRecordExpense);
