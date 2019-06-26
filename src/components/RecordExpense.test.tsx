import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox';

import { getInputValue, getInputProps } from '../utils/helper';
import { UnconnectedRecordExpense } from './RecordExpense';

describe('<UnconnectedRecordExpense />', () => {
  let wrapper: ShallowWrapper;
  let submitButton: ShallowWrapper;
  let amountInput: ShallowWrapper;
  let categoryInput: ShallowWrapper;
  let dateInput: ShallowWrapper;

  const handleAddExpense = jest.fn();
  beforeEach(() => {
    wrapper = shallow<UnconnectedRecordExpense>(
      <UnconnectedRecordExpense handleAddExpense={handleAddExpense} />
    );
    submitButton = wrapper.find('input.submit');
    amountInput = wrapper.find('input.amount');
    categoryInput = wrapper.find(Combobox);
    dateInput = wrapper.find(DateTimePicker);
  });

  describe('amount input', () => {
    it('should shows a input for record expense amount with default value 0', () => {
      expect(amountInput.exists()).toBe(true);
      expect(amountInput.props().value).toEqual('0');
    });

    it('should shows a error message after change amount to 0 or empty', () => {
      amountInput.simulate('change', { target: { value: '0.0' } });
      expect(wrapper.find('span#amount-message').exists()).toBe(true);
      expect(wrapper.find('span#amount-message').text()).toEqual(
        'amount can not be 0'
      );
    });

    it('should shows a error message if amount is not a number', () => {
      amountInput.simulate('change', { target: { value: 'p' } });
      expect(wrapper.find('span#amount-message').exists()).toBe(true);
      expect(wrapper.find('span#amount-message').text()).toEqual(
        'please input a number'
      );
    });

    it('should hide the error message after change amount to a right value', () => {
      amountInput.simulate('change', { target: { value: '1.23' } });
      expect(wrapper.find('span#amount-message').exists()).toBe(false);
    });
  });

  describe('category input', () => {
    it('should shows an empty input for record expense category', () => {
      expect(categoryInput.exists()).toBe(true);
      expect(categoryInput.props().value).toEqual('');
    });
    it('should shows a message if change category to empty', () => {
      categoryInput.simulate('change', '     ');
      expect(wrapper.find('span#category-message').exists()).toBe(true);
      expect(wrapper.find('span#category-message').text()).toEqual(
        'category can not be empty'
      );
    });
    it('should hide the error message after change category to a right value', () => {
      categoryInput.simulate('change', 'c');
      expect(wrapper.find('span#category-message').exists()).toBe(false);
    });
  });

  describe('date input', () => {
    const now: object = new Date('Tue Apr 16 2019 19:55:50 GMT-0700');
    global.Date = jest.fn(() => now);
    it('should shows an input with a default value now for record expense date', () => {
      expect(dateInput.exists()).toBe(true);
      expect(dateInput.props().value).toEqual(now);
    });

    it('should shows a message if date category to empty', () => {
      dateInput.simulate('change', '');
      expect(wrapper.find('span#date-message').exists()).toBe(true);
      expect(wrapper.find('span#date-message').text()).toEqual(
        'please input a valid date'
      );
    });

    it('should hide the message if change date to a right datetime', () => {
      dateInput.simulate('change', now);
      expect(wrapper.find('span#date-message').exists()).toBe(false);
    });

    // it('should shows a message if change date to a wrong value', () => {
    //   dateInput.simulate('change', 'abc');
    //   expect(wrapper.find('span#date-message').exists()).toBe(true);
    //   expect(wrapper.find('span#date-message').text()).toEqual('please input a valid date');
    // });
  });

  describe('submit button', () => {
    it('should shows a RECORD button for submit', () => {
      expect(submitButton.exists()).toBe(true);
      expect(submitButton.props().value).toEqual('RECORD');
    });

    it('should disable submit button if amount is empty or 0', () => {
      amountInput.simulate('change', { target: { value: '0.0' } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      amountInput.simulate('change', { target: { value: '0' } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      amountInput.simulate('change', { target: { value: '' } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should disable submit button if category is empty', () => {
      categoryInput.simulate('change', '');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      categoryInput.simulate('change', '     ');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should disable submit button if date is empty', () => {
      dateInput.simulate('change', null);
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      dateInput.simulate('change', '');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should enable submit button if category and amount value are right', () => {
      amountInput.simulate('change', { target: { value: '0.1' } });
      categoryInput.simulate('change', 'cc');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(false);
    });
  });

  describe('form submition', () => {
    it('should call handleAddExpense event when click the record button', () => {
      amountInput.simulate('change', { target: { value: '0.1' } });
      categoryInput.simulate('change', 'c');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(false);
      const form = wrapper.find('form.record');
      form.simulate('submit', { preventDefault: () => {} });
      expect(handleAddExpense).toBeCalled();
    });
  });
});
