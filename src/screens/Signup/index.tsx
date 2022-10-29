import AppBar from '../../features/Menu/components/AppBar';
import { Outlet } from 'react-router';

const SignupScreen = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};

export default SignupScreen;
