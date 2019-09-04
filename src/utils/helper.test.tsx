import {
  buildUrlWithParams,
  parseUrlParams,
  isEmptyString,
  isEmptyObject
} from './helper';

describe('isEmptyString', () => {
  it('should return true if pass 1 or 1+ spaces, null or undefined', () => {
    expect(isEmptyString('')).toBe(true);
    expect(isEmptyString('   ')).toBe(true);
    expect(isEmptyString(null)).toBe(true);
    expect(isEmptyString(undefined)).toBe(true);
  });
  it('should return false if pass a string with content', () => {
    expect(isEmptyString('   a')).toBe(false);
  });
});

describe('isEmptyObject', () => {
  it('should return true if pass a empty dictionary, null or undefined', () => {
    expect(isEmptyObject({})).toBe(true);
    expect(isEmptyObject(new Object({}))).toBe(true);
    expect(isEmptyObject(null)).toBe(true);
    expect(isEmptyObject(undefined)).toBe(true);
  });
});

describe('buildUrlWithParams', () => {
  it('should return full url base on parameter url and params', () => {
    const url = 'www.xxx.com';
    const params = { a: '1', b: 2 };
    expect(buildUrlWithParams(url, params)).toEqual('www.xxx.com?a=1&b=2');
  });

  it('should return original url if params is empty', () => {
    const url = 'www.xxx.com';
    const params = {};
    expect(buildUrlWithParams(url, params)).toEqual('www.xxx.com');
  });
});

describe('parseUrlParams', () => {
  const url = 'http://localhost:8000/expense/?page=2';
  it('should return {"page": "2"} if pass url below', () => {
    expect(parseUrlParams(url)).toEqual({ page: '2' });
  });
});
