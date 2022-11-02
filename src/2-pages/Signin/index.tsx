import AppBar from '../../4-features/Menu/components/AppBar';
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
