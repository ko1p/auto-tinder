import AppBar from '../../4-features/Menu/components/AppBar';
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
