import { Category } from '../store/category/types';
import { httpGet } from './client';

export function listCategory() {
  return httpGet(
    'categories/',
    (json: any): Category[] => {
      return json.results as Category[];
    }
  );
}
