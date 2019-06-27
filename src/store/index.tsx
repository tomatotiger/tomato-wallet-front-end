import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { loadingBarReducer } from 'react-redux-loading';

import { AuthState } from './auth/types';
import { authReducer } from './auth/reducers';
import { categoryReducer } from './category/reducers';
import { expenseReducer } from './expense/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  expense: expenseReducer,
  loadingBar: loadingBarReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
