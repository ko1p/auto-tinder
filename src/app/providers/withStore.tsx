import { Provider } from 'react-redux';
import React from 'react';
import { setupStore } from '../store';

const store = setupStore();

const withStore = (component: () => React.ReactNode) => () =>
  <Provider store={store}>{component()}</Provider>;

export default withStore;
