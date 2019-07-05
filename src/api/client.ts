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

export const httpGet = async <Data>(
  endPoint: string,
  decode: (json: any) => Result<Data, Client.DecodeError>
): Promise<Client.APIResponse<Data>> => {
  try {
    const resp: Response = await fetch(APIUrl + endPoint);
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

// export const httpPost = async <Data>(
//   endPoint: string,
//   formData: Data
// ): Promise<Client.APIResponse<Data, any>> => {
//   return <Promise>
// };
