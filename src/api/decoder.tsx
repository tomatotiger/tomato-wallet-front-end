import { Result } from '../utils/result';
import * as Client from './types';
import { Category } from '../store/category/types';
import { Expense } from '../store/expense/types';
import { PaginateArrayData } from '../store/types';
import { parseUrlParams } from '../utils/helper';
import { SimpleDecoder, ObjectDecoder, ArrayDecoder, Schema } from './types';

export function objectField<Data>(schema: Schema): ObjectDecoder<Data> {
  return (json: any): Result<Data, Client.ObjectDecodeError> => {
    if (json == null || json.constructor.name !== 'Object') {
      return Result.failure({ '.': 'Decode error: wrong constructor.' });
    }
    let data: { [s: string]: any } = {};
    let errors: Client.ObjectDecodeError = {};
    Object.keys(schema).forEach(k => {
      const { apiName, field } = schema[k];
      if (apiName in json) {
        const result = field(json[apiName]);
        if (result.success) {
          data[k] = result.data;
        } else {
          errors[k] = result.error.message;
        }
      } else {
        errors[k] = `Missing field ${k}`;
      }
    });
    if (Object.keys(errors).length > 0) {
      return Result.failure(errors);
    } else {
      return Result.success(data as Data);
    }
  };
}

export function arrayField<Item>(
  itemDecoder: ObjectDecoder<Item>,
  tolerant: boolean = true
): ArrayDecoder<Item> {
  // TODO: if tolerant is true, return Success Result even some item got decode error.
  return (json: any): Result<Item[], Client.ArrayDecodeError> => {
    if (json == null || json.constructor.name !== 'Array') {
      return Result.failure({
        message: 'Decode error: wrong constructor of response data.'
      });
    } else {
      let data: Item[] = [];
      let errors: Client.ObjectDecodeError[] = [];
      json.forEach((row: any) => {
        const result = itemDecoder(row);
        result.success === true
          ? data.push(result.data as Item)
          : errors.push(result.error);
      });

      if (tolerant === false && errors.length > 0) {
        return Result.failure({ message: 'Item decode error.', errors });
      } else {
        return Result.success(data);
      }
    }
  };
}

export function listField<Item>(
  itemDecoder: ObjectDecoder<Item>
): ObjectDecoder<PaginateArrayData<Item>> {
  return (
    json: any
  ): Result<PaginateArrayData<Item>, Client.ObjectDecodeError> => {
    // check constructor
    if (json == null || json.constructor.name !== 'Object') {
      return Result.failure({
        '.': 'Decode error: wrong constructor of response data.'
      });
    }
    const { count, next, previous, results } = json;
    if (results == null || results.constructor.name !== 'Array') {
      return Result.failure({
        '.': 'Decode error: wrong constructor of results in response data.'
      });
    }

    // get pagination info
    const p = previous
      ? Number(parseUrlParams(previous.toString())['page'])
      : null;
    const n = next ? Number(parseUrlParams(next.toString())['page']) : null;
    const pagination = {
      count,
      next: n,
      previous: p,
      current: p && n ? n - p : 1
    };

    let listData: Item[] = [];
    let errors: Client.ObjectDecodeError = {};
    results.map((e: any) => {
      const result = itemDecoder(e);
      result.success === true
        ? listData.push(result.data)
        : (errors = { ...errors, ...result.error });
    });
    // TODO: if few decode faild, still return rest items. So Even return a success
    // Result, shoud return errors together
    return Result.success({ pagination, results: listData });
  };
}

export const numberField: SimpleDecoder<number> = (
  json: any
): Result<number, Client.SimpleDecodeError> => {
  const n = Number(json);
  if (isNaN(n)) {
    return Result.failure({ message: `${json} is not a number` });
  } else {
    return Result.success(n);
  }
};

export const dateField: SimpleDecoder<Date> = (
  json: any
): Result<Date, Client.SimpleDecodeError> => {
  const timestamp = Date.parse(json);
  if (isNaN(timestamp)) {
    return Result.failure({ message: `${json} is not a valid date` });
  } else {
    return Result.success(new Date(timestamp));
  }
};

export const stringField: SimpleDecoder<string> = (
  json: any
): Result<string, Client.SimpleDecodeError> => {
  if (typeof json === 'string') {
    return Result.success(json);
  } else {
    if ('toString' in json) {
      return Result.success(json.toString());
    } else {
      return Result.failure({ message: `${json} is not a string` });
    }
  }
};
