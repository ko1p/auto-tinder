import { Route, Routes } from 'react-router';

import { Main } from 'pages/Main/Main';
import React from 'react';
import { SignIn } from 'pages/SignIn/SignIn';
import { SpinPage } from 'shared/ui/SpinPage/SpinPage';
import { routing } from 'shared/routing';
import { useAutoLogin } from 'shared/lib/hooks/useAutoLogin';
import { CarDetailsPage } from './CarDetailsPage/CarDetailsPage';
import { Forgot } from './Forgot/Forgot';
import { Layout } from './lib/Layout';
import { NotFound } from './NotFound/NotFound';
import { Profile } from './Profile/Profile';
import { RouteWrapper } from './lib/RouteWrapper';
import { SignUp } from './SignUp/SignUp';
import { UserCar } from './UserCarPage/UserCar';
import { Verification } from './Verification/Verification';
import { Cars } from './Cars/Cars';

export const RouterPage = () => {
  const { accessToken, autoLogin } = useAutoLogin();

  if (!autoLogin) return <SpinPage />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RouteWrapper title="Главная" />}>
          <Route path={routing.main} element={<Main />} />
        </Route>
        <Route element={<RouteWrapper title="Машины" />}>
          <Route path={routing.cars} element={<Cars />} />
        </Route>
        <Route
          element={
            <RouteWrapper
              title="Вход"
              isAccess={!accessToken}
              redirect={routing.profile}
            />
          }
        >
          <Route path={routing.signIn} element={<SignIn />} />
        </Route>
        <Route
          element={
            <RouteWrapper
              title="Регистрация"
              isAccess={!accessToken}
              redirect={routing.profile}
            />
          }
        >
          <Route path={routing.signUp} element={<SignUp />} />
        </Route>
        <Route
          element={
            <RouteWrapper
              title="Подробности о машине"
              redirect={routing.signIn}
              isAccess={!!accessToken}
            />
          }
        >
          <Route path={routing.carDetail} element={<CarDetailsPage />} />
        </Route>
        <Route
          element={
            <RouteWrapper
              isAccess={!!accessToken}
              title="Профиль"
              redirect={routing.signIn}
            />
          }
        >
          <Route path={routing.profile} element={<Profile />} />
        </Route>
        <Route
          element={
            <RouteWrapper
              title="Просмотр авто"
              isAccess={!!accessToken}
              redirect={routing.signIn}
            />
          }
        >
          <Route path={routing.userCar} element={<UserCar />} />
        </Route>
        <Route element={<RouteWrapper title="Подтверждение почты" />}>
          <Route path={routing.confirm} element={<Verification />} />
        </Route>
        <Route element={<RouteWrapper title="Восстановление пароля" />}>
          <Route path={routing.forgot} element={<Forgot stage="mail" />} />
        </Route>
        <Route element={<RouteWrapper title="Смена пароля" />}>
          <Route
            path={routing.resetPassword}
            element={<Forgot stage="pass" />}
          />
        </Route>
        <Route element={<RouteWrapper title="404" />}>
          <Route path={routing.notFound} element={<NotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};
