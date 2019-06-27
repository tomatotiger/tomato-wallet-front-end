import { ShallowWrapper } from 'enzyme';

export const getInputValue = (wrapper: ShallowWrapper, selector: string) => {
  const textInput = wrapper.find(selector);
  return textInput.props().value;
};

export const getInputProps = (wrapper: ShallowWrapper, selector: string) => {
  const input = wrapper.find(selector);
  return input.props();
};

export const isEmpty = (s?: string | null) => {
  if (s === undefined) {
    return true;
  } else if (s === null) {
    return true;
  } else {
    return s.trim() === '';
  }
};

export const compareTwoArraies = (arr1: any[], arr2: any[]) => {
  if (!arr1 && !arr2) return true;

  // compare lengths - can save a lot of time
  if (arr1.length !== arr2.length) return false;

  for (var i = 0, l = arr1.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arr1[i].equals(arr2[i])) return false;
    } else if (arr1[i] !== arr2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
};

export const assertExhaustiveSwitch = (arg: never) => undefined;
