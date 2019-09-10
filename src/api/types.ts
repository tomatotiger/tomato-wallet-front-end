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

export interface SimpleError {
  message: string;
}

export interface ObjectError {
  message: string;
  errors?: {
    [field: string]: string;
  };
}

export interface ArrayError {
  message: string;
  errors?: {
    [index: number]: SimpleError | ObjectError;
  };
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
export type SimpleDecoder<Data> = Decoder<Data, SimpleError>;
export type ObjectDecoder<Data> = Decoder<Data, ObjectError>;
export type ArrayDecoder<Data> = Decoder<Data[], ArrayError>;

export interface Schema {
  [fieldName: string]: {
    field: SimpleDecoder<any> | ObjectDecoder<any> | ArrayDecoder<any>;
    apiName: string;
  };
}

export interface NestedSchema<Item, ItemDecoder> {
  [fieldName: string]: {
    field: SimpleDecoder<any> | ObjectDecoder<any> | ArrayDecoder<Item>;
    apiName: string;
  };
}
