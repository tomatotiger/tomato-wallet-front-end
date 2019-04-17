import React, { Component } from 'react';
import './App.scss';
import { RecordExpense } from './components/RecordExpense';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Tomato Wallet</header>
        <div className="content">
          <RecordExpense />
        </div>
      </div>
    );
  }
}

export default App;
