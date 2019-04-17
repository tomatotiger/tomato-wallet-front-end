import React, { Component } from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en');
momentLocalizer();

export class RecordExpense extends Component {
  render() {
    return (
      <div className="content">
        <form className="record">
          <input className="amount" placeholder='Amount' required />
          <input className="category" placeholder='Category' required />
          <DateTimePicker defaultValue={new Date()} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
