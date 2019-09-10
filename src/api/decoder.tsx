import { Result } from '../utils/result';
import * as Client from './types';
import { Category } from '../store/category/types';
import { Expense } from '../store/expense/types';
import { PaginateArrayData } from '../store/types';
import { parseUrlParams } from '../utils/helper';
import {
  SimpleDecoder,
  ObjectDecoder,
  ArrayDecoder,
  Decoder,
  Schema
} from './types';

export const numberField: SimpleDecoder<number> = (
  json: any
): Result<number, Client.SimpleError> => {
  const n = Number(json);
  if (isNaN(n)) {
    return Result.failure({ message: `${json} is not a number` });
  } else {
    return Result.success(n);
  }
};

export const dateField: SimpleDecoder<Date> = (
  json: any
): Result<Date, Client.SimpleError> => {
  const timestamp = Date.parse(json);
  if (isNaN(timestamp)) {
    return Result.failure({ message: `${json} is not a valid date` });
  } else {
    return Result.success(new Date(timestamp));
  }
};

export const stringField: SimpleDecoder<string> = (
  json: any
): Result<string, Client.SimpleError> => {
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

export const pageField: SimpleDecoder<number | null> = (
  json: any
): Result<number | null, Client.SimpleError> => {
  // parse page number from a url sting
  if (json == null) {
    return Result.success(null);
  }

  if (json.constructor.name !== 'String') {
    return Result.failure({
      message: `can't parse page from a ${json.constructor.name}: ${json}`
    });
  } else {
    const params = parseUrlParams(json);
    if ('page' in params) {
      return Result.success(Number(parseUrlParams(json)['page']));
    } else {
      return Result.failure({ message: `no page info in ${json}` });
    }
  }
};

export function objectField<Data>(schema: Schema): ObjectDecoder<Data> {
  return (json: any): Result<Data, Client.ObjectError> => {
    if (json == null || json.constructor.name !== 'Object') {
      return Result.failure({ message: 'wrong constructor.' });
    }
    let data: { [s: string]: any } = {};
    let errors: { [field: string]: string } = {};

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
      return Result.failure({
        message: 'Fields decode error',
        errors
      });
    } else {
      return Result.success(data as Data);
    }
  };
}

export function arrayField<Item>(
  itemDecoder: Decoder<Item, Client.ArrayError>,
  tolerant: boolean = true
): ArrayDecoder<Item> {
  // TODO: if tolerant is true, return Success Result even some item got decode error.
  return (json: any): Result<Item[], Client.ArrayError> => {
    if (json == null || json.constructor.name !== 'Array') {
      return Result.failure({
        message: 'Decode error: wrong constructor of response data.'
      });
    } else {
      let data: Item[] = [];
      let errors: { [i: number]: any } = {};
      json.forEach((row: any, index: number) => {
        const result = itemDecoder(row);
        result.success === true
          ? data.push(result.data as Item)
          : (errors[index] = result.error);
      });

      if (tolerant === false && Object.keys(errors).length > 0) {
        return Result.failure({ message: 'Item decode error.', errors });
      } else {
        return Result.success(data);
      }
    }
  };
}
