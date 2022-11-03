import 'antd/dist/antd.css';
import 'normalize.css';

import React from 'react';
import { RouterPage } from 'pages/Router';
import withProviders from './providers';

const App = () => <RouterPage />;

export default withProviders(App);
