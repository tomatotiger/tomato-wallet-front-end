import { Result } from '../utils/result';
import { PaginateArrayData } from '../store/types';

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

export interface SimpleDecodeError {
  message: string;
}

export interface ObjectDecodeError {
  [field: string]: string;
}

export interface ArrayDecodeError {
  message: string;
  errors?: ObjectDecodeError[];
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

interface BadSchema<DecodeError> {
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
export const badSchema = <DecodeError>(
  error: DecodeError
): BadSchema<DecodeError> => ({
  kind: 'BadSchema',
  error
});

export type APIError<DecodeError> =
  | NetworkError
  | BadStatus
  | BadBody
  | BadSchema<DecodeError>;

export type APIResponse<Data, DecodeError> = Result<
  Data,
  APIError<DecodeError>
>;

export type Decoder<Data, DecodeError> = (
  json: any
) => Result<Data, DecodeError>;
export type SimpleDecoder<Data> = Decoder<Data, SimpleDecodeError>;
export type ObjectDecoder<Data> = Decoder<Data, ObjectDecodeError>;
export type ArrayDecoder<Data> = Decoder<Data[], ArrayDecodeError>;

export interface Schema {
  [fieldName: string]: {
    field: SimpleDecoder<any> | ObjectDecoder<any>;
    apiName: string;
  };
}
