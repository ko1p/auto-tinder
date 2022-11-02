import AppBar from '../../4-features/Menu/components/AppBar';
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
