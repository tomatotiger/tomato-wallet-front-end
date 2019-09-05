import { Result } from '../utils/result';
import * as Client from './types';
import { Category } from '../store/category/types';
import { Expense } from '../store/expense/types';
import { ListData } from '../store/types';
import { parseUrlParams } from '../utils/helper';
import { SimpleDecoder, ObjectDecoder, Schema } from './types';

export function objectField<Data>(schema: Schema): ObjectDecoder<Data> {
  return (raw: any): Result<Data, Client.ObjectDecodeError> => {
    if (raw == null || raw.constructor.name !== 'Object') {
      return Result.failure({ '.': 'Decode error: wrong constructor.' });
    }
    let data: { [s: string]: any } = {};
    let errors: Client.ObjectDecodeError = {};
    Object.keys(schema).forEach(k => {
      const { apiName, field } = schema[k];
      if (apiName in raw) {
        const result = field(raw[apiName]);
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

export function listField<Item>(
  itemDecoder: ObjectDecoder<Item>
): ObjectDecoder<ListData<Item>> {
  return (json: any): Result<ListData<Item>, Client.ObjectDecodeError> => {
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
  raw: any
): Result<number, Client.SimpleDecodeError> => {
  const n = Number(raw);
  if (isNaN(n)) {
    return Result.failure({ message: `${raw} is not a number` });
  } else {
    return Result.success(n);
  }
};

export const dateField: SimpleDecoder<Date> = (
  raw: any
): Result<Date, Client.SimpleDecodeError> => {
  const timestamp = Date.parse(raw);
  if (isNaN(timestamp)) {
    return Result.failure({ message: `${raw} is not a valid date` });
  } else {
    return Result.success(new Date(timestamp));
  }
};

export const stringField: SimpleDecoder<string> = (
  raw: any
): Result<string, Client.SimpleDecodeError> => {
  if (typeof raw === 'string') {
    return Result.success(raw);
  } else {
    if ('toString' in raw) {
      return Result.success(raw.toString());
    } else {
      return Result.failure({ message: `${raw} is not a string` });
    }
  }
};
