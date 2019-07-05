import { Category } from '../store/category/types';
import { httpGet, APIResponse } from './client';
import { Result } from '../utils/result';

interface CategoryDecodeError {
  message: string;
}

export function listCategory() {
  const decode = (json: any): Result<Category[], any> => ({
    success: true,
    data: json as Category[]
  });
  return httpGet('categories/', decode);
}
