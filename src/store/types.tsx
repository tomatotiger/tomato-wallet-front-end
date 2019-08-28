interface Pagination {
  current: number;
  previous: number | null;
  next: number | null;
  count: number;
}

export interface ListData<Data> {
  pagination: Pagination;
  results: Data[];
}

export const initialListData = (): ListData<any> => ({
  pagination: {
    count: 0,
    current: 1,
    previous: null,
    next: null
  },
  results: []
});
