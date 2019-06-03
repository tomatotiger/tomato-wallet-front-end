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

export const loggedInUser = (uid: number, username: string): AuthState => ({
  loginState: 'LOGGED_IN',
  uid,
  username
});
export const anonymousUser = (): AuthState => ({ loginState: 'ANONYMOUS' });

export type AuthActionTypes = LoginAction | LogoutAction;
