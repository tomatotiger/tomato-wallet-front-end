import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

interface State {
  amount?: number;
  category: string;
  date: Date;
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
      amount === undefined ||
      amount === 0 ||
      date === null ||
      category.trim() === ''
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
      <div className="content">
        <form className="record" onSubmit={this.onSubmit}>
          <input
            name="amount"
            type="number"
            step="0.01"
            className="amount"
            placeholder="Amount"
            required
            value={amount}
            onChange={e => this.onChange('amount', e.target.value)}
          />
          <input
            name="category"
            className="category"
            placeholder="Category"
            required
            value={category}
            onChange={e => this.onChange('category', e.target.value)}
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
            disabled={this.disabled()}
          />
        </form>
      </div>
    );
  }
}
