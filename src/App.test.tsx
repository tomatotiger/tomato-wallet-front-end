import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';

import { UnconnectedApp } from './App';
import { anonymousUser } from './store/auth/types';
import { Homepage } from './pages/Homepage';
import { Footer } from './components/Footer';

describe('<UnconnectedApp />', () => {
  const mockHandleInitialData = jest.fn();
  const wrapper = shallow(
    <UnconnectedApp handleInitialData={mockHandleInitialData} />
  );
  it('should chontain Homepage component and Footer component', () => {
    expect(wrapper.find(Homepage)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
  });
});
