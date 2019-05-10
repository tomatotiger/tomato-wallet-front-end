export interface AuthState {
  loggedIn: boolean;
  uid: number | null;
  userName: string | null;
}

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
