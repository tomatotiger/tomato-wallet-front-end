import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { showLoading, hideLoading } from 'react-redux-loading';

import { AppState } from './store';
import { login } from './store/auth/actions';
import { getCategories } from './store/category/actions';
import { getExpenses } from './store/expense/actions';
import { AuthState } from './store/auth/types';
import { CategoryState } from './store/category/types';
import { ExpenseHistoryState } from './store/expense/types';
import { Homepage } from './pages/Homepage';
import { Footer } from './components/Footer';
import './stylesheets/main.scss';
import { thunkGetInitialData } from './thunks';

interface AppProps {
  auth: AuthState;
  category: CategoryState;
  expense: ExpenseHistoryState;
  handleInitialData: () => Promise<void>;
}

class App extends Component<AppProps> {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <div className="app">
        <Homepage />
        <Footer />
      </div>
    );
  }
}

const testUser: AuthState = {
  loginState: 'LOGGED_IN',
  uid: 1,
  username: 'tomato'
};

export const handleInitialData = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(showLoading());
  dispatch(login(testUser));
  return thunkGetInitialData(1).then(({ categories, expenses }) => {
    dispatch(getCategories(categories));
    dispatch(getExpenses(expenses));
    dispatch(hideLoading());
  });
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  category: state.category,
  expense: state.expense
});

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
