import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';

// eslint-disable-next-line react/display-name
const withMUI = (component: () => React.ReactNode) => () =>
  <ThemeProvider theme={theme}>{component()}</ThemeProvider>;

export default withMUI;
