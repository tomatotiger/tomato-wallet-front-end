import { Result } from '../utils/result';

interface MissingField {
  kind: 'missing';
  fieldName: string;
}
interface WrongTypeField {
  kind: 'wrongType';
  fieldName: string;
}
export const missingField = (fieldName: string): MissingField => ({
  kind: 'missing',
  fieldName
});
export const wrongTypeField = (fieldName: string): WrongTypeField => ({
  kind: 'wrongType',
  fieldName
});
type ErrorField = MissingField | WrongTypeField;

export interface DecodeError {
  // message: ErrorField[];
  message: string;
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

interface BadSchema {
  kind: 'BadSchema';
  error: DecodeError;
}
//TODO: extra error: Timeout, BadBody, BadUrl

export const networkError = (): NetworkError => ({ kind: 'NetworkError' });
export const badStatus = (response: Response): BadStatus => ({
  kind: 'BadStatus',
  response
});
export const badBody = (response: Response): BadBody => ({
  kind: 'BadBody',
  response
});
export const badSchema = (error: DecodeError): BadSchema => ({
  kind: 'BadSchema',
  error
});

export type APIError = NetworkError | BadStatus | BadBody | BadSchema;

export type APIResponse<Data> = Result<Data, APIError>;

export interface ListResponseData<Data> {
  count: number;
  next: URL | null;
  previous: URL | null;
  results: Data[];
}

export const initialListReponseData = (): ListResponseData<any> => ({
  count: 0,
  next: null,
  previous: null,
  results: []
});
