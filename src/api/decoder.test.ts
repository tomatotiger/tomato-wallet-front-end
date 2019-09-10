import { numberField, arrayField, pageField } from './decoder';
import { Result } from '../utils/result';

describe('pageField', () => {
  it('should get success result with page number from a url with page number', () => {
    expect(pageField('http://localhost:8000/expense/?page=2')).toEqual(
      Result.success(2)
    );
  });

  it('should get success result with null from a null or a undefined', () => {
    expect(pageField(null)).toEqual(Result.success(null));
  });

  it('should get falure result with error message if url is not a string', () => {
    expect(pageField(2)).toEqual(
      Result.failure({ message: "can't parse page from a Number: 2" })
    );
    expect(pageField({ a: 'a' })).toEqual(
      Result.failure({
        message: "can't parse page from a Object: [object Object]"
      })
    );
  });

  it('should get falure result with error message from a url has not page parameter', () => {
    const url1 = 'http://localhost:8000/expense/?hi=1';
    expect(pageField(url1)).toEqual(
      Result.failure({ message: 'no page info in ' + url1 })
    );
    const url2 = 'http://localhost:8000/expense/';
    expect(pageField(url2)).toEqual(
      Result.failure({ message: 'no page info in ' + url2 })
    );
  });
});

describe('arrayField', () => {
  it("should decode ['1', '2', '3'] to [1,2,3]", () => {
    expect(arrayField(numberField)(['1', 2, '3'])).toEqual(
      Result.success([1, 2, 3])
    );
  });
});
