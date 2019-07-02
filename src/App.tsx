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
import { listExpense } from './api/expense';
import { listCategory } from './api/category';

interface AppProps {
  auth: AuthState;
  category: CategoryState;
  expense: ExpenseHistoryState;
  handleInitialData: () => Promise<void>;
}

export class UnconnectedApp extends Component<AppProps> {
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

export const thunkGetInitialData = () => {
  return Promise.all([listCategory(), listExpense()]).then(
    ([categories, expenses]) => ({
      categories,
      expenses
    })
  );
};

export const handleInitialData = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(showLoading());
  dispatch(login(1, 'tomato'));
  return thunkGetInitialData().then(({ categories, expenses }) => {
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
)(UnconnectedApp);
