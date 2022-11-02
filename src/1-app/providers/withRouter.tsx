import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react/display-name
const withRouter = (component: () => React.ReactNode) => () =>
  <BrowserRouter>{component()}</BrowserRouter>;

export default withRouter;
