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

const httpRequest = async <Data>(
  resp: Response,
  decode: Client.ObjectDecoder<Data>
): Promise<Client.APIResponse<Data>> => {
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

export async function httpGet<Data>(
  endPoint: string,
  decode: Client.ObjectDecoder<Data>
): Promise<Client.APIResponse<Data>> {
  return httpRequest(await fetch(APIUrl + endPoint), decode);
}

export async function httpPost<Data>(
  endPoint: string,
  body: FormData,
  decode: Client.ObjectDecoder<Data>
): Promise<Client.APIResponse<Data>> {
  const settings: RequestInit = {
    method: 'POST',
    body
  };
  return httpRequest(await fetch(APIUrl + endPoint, { ...settings }), decode);
}
