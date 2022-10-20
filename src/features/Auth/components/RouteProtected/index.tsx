import { useAppSelector } from '../../../../store/hooks/redux';
import { Navigate, Outlet, RouteProps } from 'react-router';
import { CircularProgress } from '@mui/material';
import { ReactElement } from 'react';
import Wrapper from '../../../../ui-library/components/Wrapper';
import Box from '@mui/material/Box';

type ProtectedRouteProps = {
  children?: ReactElement;
  onlyUnAuth?: boolean;
  redirectPath?: string;
} & RouteProps;

const RouteProtected: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  redirectPath = '/',
  children,
}) => {
  const { isAuth, isAuthCheked, errorText, isLoading, isOnboarded, isReqSent } = useAppSelector(
    state => state.auth,
  );

  if (!isLoading && !isOnboarded && !errorText && isReqSent) {
    return <Navigate replace to='/onboarding/user-phone-request' />;
  }

  if (!isAuthCheked) {
    return (
      <Wrapper component='main' xs={12} sm={10} md={8} lg={6} xl={4}>
        <Box my={20} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </Box>
      </Wrapper>
    );
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate replace to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default RouteProtected;
