import { APIResponse, Schema } from '../../api/types';
import { RecordExpenseAction } from '../expense/types';
import * as Decoder from '../../api/decoder';
import { ListData } from '../types';

export interface Category {
  id: number;
  name: string;
}

export const schema: Schema = {
  id: { field: Decoder.numberField, apiName: 'id' },
  name: { field: Decoder.stringField, apiName: 'name' }
};

export interface CategoryState {
  categories: APIResponse<ListData<Category>>;
}

export const GOT_CATEGORIES = 'GOT_CATEGORIES';

export interface GotCategoriesAction {
  type: typeof GOT_CATEGORIES;
  categoryResult: APIResponse<ListData<Category>>;
}

export type CategoryActionTypes = GotCategoriesAction | RecordExpenseAction;
