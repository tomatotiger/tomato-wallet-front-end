export interface Success<Data> {
  success: true;
  data: Data;
}
export interface Failure<Err> {
  success: false;
  error: Err;
}
export type Result<Data, Err> = Success<Data> | Failure<Err>;

export const Result = {
  success: <Data>(data: Data): Success<Data> => ({
    success: true,
    data
  }),
  failure: <Err>(error: Err): Failure<Err> => ({
    success: false,
    error
  }),
  map: <Data, Data2, Err>(
    result: Result<Data, Err>,
    fn: (data: Data) => Data2
  ): Result<Data2, Err> => {
    if (result.success === true) {
      return Result.success(fn(result.data));
    } else {
      return result;
    }
  }
};
