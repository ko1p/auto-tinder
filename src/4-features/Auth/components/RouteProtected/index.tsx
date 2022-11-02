import { FC } from 'react';
import { useAppSelector } from '../../../../1-app/store/hooks/redux';
import { Navigate, Outlet } from 'react-router';
import { CircularProgress } from '@mui/material';
import Wrapper from '../../../../6-shared/components/Wrapper';
import Box from '@mui/material/Box';
import { ProtectedRouteProps } from '../../types';

const RouteProtected: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  onlyAuth = false,
  redirectPath = '/',
  children,
}) => {
  const { isAuth, isAuthCheked, errorText, isLoading, isOnboarded, isReqSent } = useAppSelector(
    state => state.auth,
  );

  if (!isAuthCheked) {
    return (
      <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
        <Box my={20} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </Box>
      </Wrapper>
    );
  }

  if (!isLoading && !isOnboarded && !errorText && isReqSent) {
    return <Navigate replace to='/onboarding/user-phone-request' />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate replace to={redirectPath} />;
  }

  if (onlyAuth && !isAuth) {
    return <Navigate replace to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default RouteProtected;
