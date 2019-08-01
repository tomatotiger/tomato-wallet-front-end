import React from 'react';
import { shallow } from 'enzyme';

import { HistoryExpense } from './HistoryExpense';

describe('<HistoryExpense />', () => {
  it("should shows 'No data' if there is no expense history", () => {
    const wrapper = shallow(
      <HistoryExpense history={{ data: [], success: true }} />
    );
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual('No data');
  });

  it("should shows 'Get data failure.' if request API failed", () => {
    const wrapper = shallow(
      <HistoryExpense history={{ data: [], success: false }} />
    );
    expect(wrapper.find('span')).toHaveLength(1);
    expect(wrapper.find('span').text()).toEqual('Get data failure.');
  });

  it('should shows a list of expense history', () => {
    const history = {
      success: true,
      data: [
        {
          id: 1,
          amount: 30.11,
          category: { id: 1, name: 'food' },
          date: '2019-05-03'
        },
        {
          id: 2,
          amount: 3.21,
          category: { id: 1, name: 'sport' },
          date: '2019-05-02'
        },
        {
          id: 3,
          amount: 9.0,
          category: { id: 1, name: 'beauty' },
          date: '2019-05-02'
        }
      ]
    };
    const wrapper = shallow(<HistoryExpense history={history} />);
    const ul = wrapper.find('ul.expense-list');
    expect(ul.exists()).toBe(true);

    // check list's length
    expect(ul.children()).toHaveLength(3);

    // only li contained in the list
    ul.children().forEach(node => {
      expect(node.type()).toEqual('li');
    });

    // check list shows correct data
    const texts = ul.children().map(node => node.text());
    expect(texts).toEqual([
      '30.11 - food - 2019-05-03',
      '3.21 - sport - 2019-05-02',
      '9.00 - beauty - 2019-05-02'
    ]);

    // check list item has id as key
    const keys = ul.children().map(node => node.key());
    expect(keys).toEqual(['1', '2', '3']);
  });
});
