import { ShallowWrapper } from 'enzyme';

export const getInputValue = (wrapper: ShallowWrapper, selector: string) => {
  const textInput = wrapper.find(selector);
  return textInput.props().value;
};

export const getInputProps = (wrapper: ShallowWrapper, selector: string) => {
  const input = wrapper.find(selector);
  return input.props();
};

export const isEmptyString = (s?: string | null) => {
  return (!s || s.trim() === '') === true ? true : false;
};

export const isEmptyObject = (d?: { [s: string]: any } | null) => {
  return (!d || Object.keys(d).length < 1) === true ? true : false;
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

export const formatDatetime = (date: Date): string =>
  date
    ? `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
    : '';

export const buildUrlWithParams = (
  url: string,
  params: { [s: string]: string | number | Date }
) => {
  if (isEmptyObject(params)) {
    return url;
  } else {
    let paramsArray: string[] = [];
    let finalUrl = url;
    Object.keys(params).forEach(key =>
      paramsArray.push(key + '=' + params[key])
    );
    return finalUrl + '?' + paramsArray.join('&');
  }
};

export const parseUrlPraams = (url: string): { [s: string]: string } => {
  let u = url || location.href;
  u = u.trim().replace(/^[?#&]/, '');

  if (!u) {
    return {};
  }

  let params: { [s: string]: string } = {};
  for (const param of u.split('&')) {
    let [key, value] = param.replace(/\+/g, ' ').split('=');
    if (key && value) {
      params[key] = encodeURIComponent(value);
    }
  }
  return params;
};
