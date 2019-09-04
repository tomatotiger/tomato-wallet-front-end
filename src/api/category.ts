import { Category, schema } from '../store/category/types';
import { buildUrlWithParams } from '../utils/helper';

import * as Request from './client';
import * as Decoder from './decoder';

interface CategoryDecodeError {
  message: string;
}

export const listCategory = (page: number = 1) => {
  const url = buildUrlWithParams('category/', { page });
  return Request.httpGet(
    url,
    Decoder.listField<Category>(Decoder.objectField<Category>(schema))
  );
};
