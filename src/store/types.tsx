interface Pagination {
  current: number;
  previous: number | null;
  next: number | null;
  count: number;
}

export interface PaginateArrayData<Data> {
  pagination: Pagination;
  results: Data[];
}

export const initialPaginateArrayData = (): PaginateArrayData<any> => ({
  pagination: {
    count: 0,
    current: 1,
    previous: null,
    next: null
  },
  results: []
});
