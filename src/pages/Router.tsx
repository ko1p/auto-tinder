import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { authAPI, logIn } from 'features/auth/model';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';

import { ApiError } from 'shared/api/error/error';
import { IError } from 'shared/lib/types';
import { Main } from 'pages/Main/Main';
import { SignIn } from 'pages/SignIn/SignIn';
import { accessTokenSelector } from 'entities/user/model/state/authSelector';
import { routing } from 'shared/routing';
import { Layout } from './lib/Layout';
import { NotFound } from './NotFound/NotFound';
import { Profile } from './Profile/Profile';
import { RouteWrapper } from './lib/RouteWrapper';
import { SignUp } from './SignUp/SignUp';
import { Verification } from './Verification/Verification';
import { CarDetailsPage } from './CarDetailsPage/CarDetailsPage';

export const RouterPage = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(accessTokenSelector);
  const [refresh] = authAPI.useRefreshMutation();
  useEffect(() => {
    const autoAuth = async () => {
      if (!accessToken)
        try {
          // const res = await fetch(
          //   'https://auto-tindr.herokuapp.com/auth/refresh',
          //   {
          //     method: 'POST',
          //     credentials: 'include',
          //   }
          // );
          // const data = await res.json();
          // console.log(data);

          const userDto = await refresh('').unwrap();
          dispatch(logIn(userDto));
        } catch (e) {
          ApiError(e as IError);
        }
    };
    autoAuth().catch(console.error);
  }, [accessToken]);
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<RouteWrapper title="Вход" />}>
          <Route path={routing.signIn} element={<SignIn />} />
        </Route>
        <Route element={<RouteWrapper title="Регистрация" />}>
          <Route path={routing.signUp} element={<SignUp />} />
        </Route>
        <Route element={<RouteWrapper title="Главная" />}>
          <Route path={routing.main} element={<Main />} />
        </Route>
        <Route element={<RouteWrapper title="Подробности о машине" />}>
          <Route path={routing.carDetail} element={<CarDetailsPage />} />
        </Route>
        <Route
          element={<RouteWrapper isAccess={!!accessToken} title="Профиль" />}
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
