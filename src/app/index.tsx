import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';

import React from 'react';
import { RouterPage } from 'pages/Router';
import withProviders from './providers';

const App = () => (
  <div className="wrapper">
    <RouterPage />
  </div>
);
export default withProviders(App);
