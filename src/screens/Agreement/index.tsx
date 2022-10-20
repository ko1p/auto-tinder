import * as React from 'react';
import AppBar from '../../features/Menu/components/AppBar';
import { Outlet } from 'react-router';

const AgreementScreen = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default AgreementScreen;
