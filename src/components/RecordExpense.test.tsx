import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Combobox from 'react-widgets/lib/Combobox'

import { getInputValue, getInputProps } from '../utils/helper';
import { UnconnectedRecordExpense } from './RecordExpense';

describe('<UnconnectedRecordExpense />', () => {
  let wrapper: ShallowWrapper;
  const handleAddExpense = jest.fn();
  beforeEach(() => {
    wrapper = shallow<UnconnectedRecordExpense>(<UnconnectedRecordExpense handleAddExpense={ handleAddExpense }/>);
  });

  describe('amount input', () => {
    let input: ShallowWrapper;
    beforeEach(() => {
      input = wrapper.find('input.amount');
    });

    it('should shows an empty input for record expense amount', () => {
      expect(input.exists()).toBe(true);
      expect(input.props().value).toEqual('');
    });
  });

  describe('category input', () => {
    let input: ShallowWrapper;
    beforeEach(() => {
      input = wrapper.find(Combobox);
    });
    it('should shows an empty input for record expense category', () => {
      expect(input.exists()).toBe(true);
      expect(input.props().value).toEqual('');
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
    let button: ShallowWrapper;
    let amountInput: ShallowWrapper;
    let categoryInput: ShallowWrapper;
    let dateInput: ShallowWrapper;

    beforeEach(() => {
      button = wrapper.find('input.submit');
      amountInput = wrapper.find('input.amount');
      categoryInput = wrapper.find(Combobox);
      dateInput = wrapper.find(DateTimePicker);
    });
    it('should shows a submit button', () => {
      expect(button.exists()).toBe(true);
    });

    it('should disable submit button if amount is empty or 0', () => {
      dateInput.simulate('change', new Date());
      categoryInput.simulate('change', 'c');

      amountInput.simulate('change', { target: { value: undefined } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      amountInput.simulate('change', { target: { value: 0.0 } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      amountInput.simulate('change', { target: { value: '0' } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      amountInput.simulate('change', { target: { value: '' } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should disable submit button if category is empty', () => {
      dateInput.simulate('change', new Date());
      amountInput.simulate('change', { target: { value: '4.5' } });

      categoryInput.simulate('change', '');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should disable submit button if date is empty', () => {
      amountInput.simulate('change', { target: { value: '4.5' } });
      categoryInput.simulate('change', 'cc');

      dateInput.simulate('change', null);
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
      dateInput.simulate('change', undefined);
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should enable submit button if category and amount value are right', () => {
      amountInput.simulate('change', { target: { value: '0.1' } });
      categoryInput.simulate('change', 'cc');
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(false);
    });
  });

  describe('form submition', () => {
    let amountInput: ShallowWrapper;
    let categoryInput: ShallowWrapper;
    let dateInput: ShallowWrapper;
    let submitButton: ShallowWrapper;
    beforeEach(() => {
      amountInput = wrapper.find('input.amount');
      categoryInput = wrapper.find(Combobox);
      dateInput = wrapper.find(DateTimePicker);
      submitButton = wrapper.find('input.submit');
    });

    it('should validate amount can be any number but 0', () => {
      categoryInput.simulate('change', 'c');
      amountInput.simulate('change', { target: { value: 0 } });
      expect(getInputProps(wrapper, 'input.submit').disabled).toBe(true);
    });

    it('should call handleAddExpense event when click the record button', () => {
      submitButton.simulate('click');
      expect(handleAddExpense).toBeCalled();
    });
  });
});
