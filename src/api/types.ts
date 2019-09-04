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
  message: string;
}

export interface SimpoleDecodeError {
  [field: string]: string;
}

export interface ObjectDecodeError {
  [field: string]: string;
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
  error: ObjectDecodeError;
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
export const badSchema = (error: ObjectDecodeError): BadSchema => ({
  kind: 'BadSchema',
  error
});

export type APIError = NetworkError | BadStatus | BadBody | BadSchema;

export type APIResponse<Data> = Result<Data, APIError>;

export type Decoder<Data> = (json: any) => Result<Data, DecodeError>;
export type SimpleDecoder<Data> = (
  json: any
) => Result<Data, SimpoleDecodeError>;
export type ObjectDecoder<Data> = (
  json: any
) => Result<Data, ObjectDecodeError>;

export interface Schema {
  [fieldName: string]: {
    field: SimpleDecoder<any> | ObjectDecoder<any>;
    apiName: string;
  };
}
