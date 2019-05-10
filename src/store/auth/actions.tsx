import { AuthState, LOGIN, LOGOUT } from './types';

export const login = (userInfo: AuthState) => {
  return {
    type: LOGIN,
    payload: userInfo
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};
