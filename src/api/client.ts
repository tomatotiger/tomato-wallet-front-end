import { Result } from '../utils/result';
import * as Client from './types';

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

const httpRequest = async <Data, Err>(
  resp: Response,
  decode: Client.Decoder<Data, Err>
): Promise<Client.APIResponse<Data, Err>> => {
  try {
    if (resp.status >= 200 && resp.status < 300) {
      try {
        const json: any = await resp.json();
        const result = decode(json);
        if (result.success) {
          return Result.success(result.data);
        } else {
          return Result.failure(Client.badSchema(result.error));
        }
      } catch (e) {
        return Result.failure(Client.badBody(resp));
      }
    } else {
      return Result.failure(Client.badStatus(resp));
    }
  } catch (e) {
    return Result.failure(Client.networkError());
  }
};

export async function httpGet<Data, Err>(
  endPoint: string,
  decode: Client.Decoder<Data, Err>
) {
  return httpRequest(await fetch(APIUrl + endPoint), decode);
}

export async function httpPost<Data, Err>(
  endPoint: string,
  body: FormData,
  decode: Client.Decoder<Data, Err>
) {
  const settings: RequestInit = {
    method: 'POST',
    body
  };
  return httpRequest(await fetch(APIUrl + endPoint, { ...settings }), decode);
}
