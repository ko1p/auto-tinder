import { BrowserRouter } from 'react-router-dom';
import React from 'react';

const withRouter = (component: () => React.ReactNode) => () =>
  <BrowserRouter>{component()}</BrowserRouter>;

export default withRouter;
