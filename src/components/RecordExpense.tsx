import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

import { isEmpty } from '../utils/helper';

Moment.locale('en');
momentLocalizer();

interface State {
  amount?: number;
  category: string | null;
  date?: Date;
}

export class RecordExpense extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      amount: undefined,
      category: '',
      date: new Date()
    };
  }

  disabled = () => {
    const { amount, category, date } = this.state;
    if (
      [undefined, 0, '', '0'].includes(amount) ||
      !date ||
      isEmpty(category)
    ) {
      return true;
    } else {
      return false;
    }
  };

  onChange = (k: string, v: any): void => {
    this.setState(currentState => ({
      ...currentState,
      [k]: v
    }));
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  render() {
    const { amount, category, date } = this.state;
    return (
      <div className="record-expense">
        <form className="record" onSubmit={this.onSubmit}>
          <input
            name="amount"
            type="number"
            step="0.01"
            className="amount"
            placeholder="Amount"
            required
            value={amount ? amount : ''}
            onChange={e => this.onChange('amount', e.target.value)}
          />
          <Combobox
            data={['orange', 'red', 'blue', 'purple']}
            placeholder="Category"
            value={category}
            onChange={value => this.onChange('category', value)}
          />
          <DateTimePicker
            defaultValue={date}
            onChange={value => this.onChange('date', value)}
            format="YYYY-MM-DD HH:mm:ss"
          />
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
