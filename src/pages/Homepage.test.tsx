import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import RecordExpense from '../components/RecordExpense';
import HistoryExpense from '../components/HistoryExpense';
import { Homepage } from './Homepage';

describe('<Homepage />', () => {
  const wrapper = shallow(<Homepage />);

  it('should contains RecordExpense component', () => {
    expect(wrapper.find(RecordExpense)).toHaveLength(1);
  });

  it('should contains HistoryExpense component', () => {
    expect(wrapper.find(HistoryExpense)).toHaveLength(1);
  });
});
