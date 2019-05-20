export type AuthState =
  | {
      loginState: 'ANONYMOUS';
    }
  | {
      loginState: 'LOGGED_IN';
      username: string;
      uid: number;
    };

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginAction {
  type: typeof LOGIN;
  payload: AuthState;
}

interface LogoutAction {
  type: typeof LOGOUT;
  payload: AuthState;
}

export type AuthActionTypes = LoginAction | LogoutAction;
