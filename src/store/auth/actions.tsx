import {
  LOGIN,
  LOGOUT,
  loggedInUser,
  anonymousUser,
  AuthActionTypes
} from './types';

export const login = (uid: number, username: string): AuthActionTypes => {
  return {
    type: LOGIN,
    payload: loggedInUser(uid, username)
  };
};

export const logout = (): AuthActionTypes => {
  return {
    type: LOGOUT,
    payload: anonymousUser()
  };
};
