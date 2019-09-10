import { Category } from '../store/category/types';
import { buildUrlWithParams } from '../utils/helper';
import { paginationSchema, categorySchema } from './schema';
import { PaginateArrayData } from '../store/types';

import * as Request from './client';
import * as Decoder from './decoder';

interface CategoryDecodeError {
  message: string;
}

export const listCategory = (page: number = 1) => {
  const url = buildUrlWithParams('category/', { page });
  return Request.httpGet(
    url,
    Decoder.objectField<PaginateArrayData<Category>>(
      paginationSchema(Decoder.objectField<Category>(categorySchema))
    )
  );
};
