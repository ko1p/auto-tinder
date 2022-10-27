import AppBar from '../../features/Menu/components/AppBar';
import { Outlet } from 'react-router';

const SigninScreen = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default SigninScreen;
