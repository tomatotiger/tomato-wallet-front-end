import { PaginateArrayData } from '../store/types';
import { Category } from '../store/category/types';
import { Schema, Decoder } from './types';
import * as Fields from './decoder';

export const categorySchema: Schema = {
  id: { field: Fields.numberField, apiName: 'id' },
  name: { field: Fields.stringField, apiName: 'name' }
};

export const expenseSchema: Schema = {
  id: { field: Fields.numberField, apiName: 'id' },
  amount: { field: Fields.numberField, apiName: 'amount' },
  recordTime: { field: Fields.dateField, apiName: 'record_time' },
  category: {
    field: Fields.objectField<Category>(categorySchema),
    apiName: 'category'
  }
};

export function paginationSchema<Item,ItemField>(itemField: Decoder<Item, any>): Schema {
  return {
    // current: { field: Fields.numberField, apiName: 'current' },
    previous: { field: Fields.pageField, apiName: 'previous' },
    next: { field: Fields.pageField, apiName: 'next' },
    count: { field: Fields.numberField, apiName: 'count' },
    results: {
      field: Fields.arrayField<Item>(itemField),
      apiName: 'results'
    }
  };
}
