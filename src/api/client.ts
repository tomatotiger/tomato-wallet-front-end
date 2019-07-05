import { Result } from '../utils/result';
const env = process.env;

let APIUrl: string;
switch (env.NODE_ENV) {
  case 'development':
    APIUrl = 'http://localhost:8000/';
    break;
  case 'production':
    APIUrl = '';
    break;
}

interface NetworkError {
  kind: 'NetworkError';
}

interface BadStatus {
  kind: 'BadStatus';
  response: Response;
}

interface BadBody {
  kind: 'BadBody';
  response: Response;
}

interface BadSchema<Err> {
  kind: 'BadSchema';
  error: Err;
}
//TODO: extra error: Timeout, BadBody, BadUrl

const networkError = (): NetworkError => ({ kind: 'NetworkError' });
const badStatus = (response: Response): BadStatus => ({
  kind: 'BadStatus',
  response
});
const badBody = (response: Response): BadBody => ({
  kind: 'BadBody',
  response
});
const badSchema = <Err>(error: Err): BadSchema<Err> => ({
  kind: 'BadSchema',
  error
});

type APIError<DecodeError> =
  | NetworkError
  | BadStatus
  | BadBody
  | BadSchema<DecodeError>;

export type APIResponse<Data, DecodeError> = Result<
  Data,
  APIError<DecodeError>
>;

export const httpGet = async <Data, DecodeError>(
  endPoint: string,
  decode: (json: any) => Result<Data, DecodeError>
): Promise<APIResponse<Data, DecodeError>> => {
  try {
    const resp: Response = await fetch(APIUrl + endPoint);
    if (resp.status >= 200 && resp.status < 300) {
      try {
        const json: any = await resp.json();
        const result = decode(json);
        if (result.success) {
          return Result.success(result.data);
        } else {
          return Result.failure(badSchema(result.error));
        }
      } catch (e) {
        return Result.failure(badBody(resp));
      }
    } else {
      return Result.failure(badStatus(resp));
    }
  } catch (e) {
    return Result.failure(networkError());
  }
};
