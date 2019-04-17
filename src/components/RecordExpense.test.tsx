import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { RecordExpense } from './RecordExpense';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

describe('<RecordExpense />', () => {
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow<RecordExpense>(<RecordExpense />);
  });

  describe('amount input', () => {
    let input: ShallowWrapper;
    beforeEach(() => {
      input = wrapper.find('input.amount');
    });
    it('should shows an input for record expense amount', () => {
      expect(input.exists()).toBe(true);
    });
  });

  describe('category input', () => {
    let input: ShallowWrapper;
    beforeEach(() => {
      input = wrapper.find('input.category');
    });
    it('should shows an input for record expense category', () => {
      expect(input.exists()).toBe(true);
    });
  });

  describe('date input', () => {
    let input: ShallowWrapper;
    const now: object = new Date('Tue Apr 16 2019 19:55:50 GMT-0700');
    global.Date = jest.fn(() => now);
    beforeEach(() => {
      input = wrapper.find(DateTimePicker);
    });
    it('should shows an input for record expense date', () => {
      expect(input.exists()).toBe(true);
    });

    it('should has a default value with now', () => {
      expect(input.props().defaultValue).toEqual(now);
    });
  });

  describe('submit button', () => {
    let input: ShallowWrapper;
    beforeEach(() => {
      input = wrapper.find('input[type="submit"]');
    });
    it('should shows a submit button', () => {
      expect(input.exists()).toBe(true);
    });
  });
});
