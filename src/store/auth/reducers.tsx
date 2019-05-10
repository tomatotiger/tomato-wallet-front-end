import { Reducer } from 'redux';
import { AuthState, LOGIN, LOGOUT, AuthActionTypes } from './types';

const initialState: AuthState = {
  loggedIn: false,
  uid: null,
  userName: null
};

const neverReached = (never: never) => {};

export const authReducer: Reducer<AuthState, AuthActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload
      };
    }
    case LOGOUT: {
      return {
        ...state,
        uid: null,
        userName: null
      };
    }
    default:
      neverReached(action); // when a new action is created, this helps us remember to handle it in the reducer
  }
  return state;
};
