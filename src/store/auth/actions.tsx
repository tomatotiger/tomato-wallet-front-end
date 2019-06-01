import { AuthState, LOGIN, LOGOUT, AuthActionTypes } from './types';

export const login = ({ uid, username }: { uid: number; username: string; }): AuthActionTypes => {
  return {
    type: LOGIN,
    payload: {
      loginState: 'LOGGED_IN',
      uid: uid,
      username: username
    }
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: {
      loginState: 'ANONYMOUS'
    }
  };
};
