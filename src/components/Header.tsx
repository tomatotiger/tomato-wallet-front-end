import React from 'react';
import tomato from '../tomato.svg';

export const Header = () => {
  return (
    <header className="app-header">
      <img src={tomato} className="app-logo" alt="logo" />
      <span data-text="Tomato Wallet" className="title">
        Tomato Wallet
      </span>
      <nav>
        <a href="/html/">History</a> |<a href="/css/">Chat</a> |
        <a href="/js/">JavaScript</a> |
      </nav>
    </header>
  );
};
