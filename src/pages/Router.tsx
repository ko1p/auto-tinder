import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import {
  accessTokenSelector,
  userSelector,
} from 'entities/user/model/state/authSelector';
import { authAPI, logIn } from 'features/auth/model';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import { Main } from 'pages/Main/Main';
import { SignIn } from 'pages/SignIn/SignIn';
import { SpinPage } from 'shared/ui/SpinPage/SpinPage';
import { routing } from 'shared/routing';
import { CarDetailsPage } from './CarDetailsPage/CarDetailsPage';
import { Layout } from './lib/Layout';
import { NotFound } from './NotFound/NotFound';
import { Profile } from './Profile/Profile';
import { RouteWrapper } from './lib/RouteWrapper';
import { SignUp } from './SignUp/SignUp';
import { Verification } from './Verification/Verification';

export const RouterPage = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(accessTokenSelector);
  const [refresh, { isLoading }] = authAPI.useRefreshMutation();
  const id = useAppSelector(userSelector);
  useEffect(() => {
    const autoAuth = async () => {
      if (!accessToken)
        try {
          const userDto = await refresh('').unwrap();
          dispatch(logIn(userDto));
        } catch (e) {
          ApiError(e as IError);
        }
    };
    autoAuth().catch(console.error);
  }, [accessToken]);
  return isLoading ? (
    <SpinPage />
  ) : (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RouteWrapper title="Главная" />}>
          <Route path={routing.main} element={<Main />} />
        </Route>
        <Route
          element={
            <RouteWrapper
              title="Вход"
              isAccess={!accessToken}
              redirect={routing.navProvile(id!)}
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
              redirect={routing.navProvile(id!)}
            />
          }
        >
          <Route path={routing.signUp} element={<SignUp />} />
        </Route>
        <Route element={<RouteWrapper title="Подробности о машине" />}>
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
        <Route element={<RouteWrapper title="404" />}>
          <Route path={routing.notFound} element={<NotFound />} />
        </Route>
        <Route element={<RouteWrapper title="Подтверждение почты" />}>
          <Route path={routing.confirm} element={<Verification />} />
        </Route>
      </Route>
    </Routes>
  );
};
