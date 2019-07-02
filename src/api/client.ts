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

export const httpGet = <T>(
  endPoint: string,
  validation: (json: any) => T
): Promise<T> => {
  return fetch(APIUrl + endPoint)
    .then(resp => resp.json())
    .then(json => {
      return validation(json);
    });
};
