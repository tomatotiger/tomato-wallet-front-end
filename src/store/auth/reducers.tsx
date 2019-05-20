import { Reducer } from 'redux';
import { AuthState, LOGIN, LOGOUT, AuthActionTypes } from './types';
import { assertExhaustiveSwitch } from '../../utils/helper';

const initialState: AuthState = {
  loginState: 'ANONYMOUS'
};

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
        loginState: 'ANONYMOUS',
        uid: null,
        username: null
      };
    }
    default:
      assertExhaustiveSwitch(action);
  }
  return state;
};
