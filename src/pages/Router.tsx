import { Route, Routes } from 'react-router';

import { Main } from 'pages/Main/Main';
import React from 'react';
import { SignIn } from 'pages/SignIn/SignIn';
import { routing } from 'shared/routing';
import { Layout } from './lib/Layout';
import { NotFound } from './NotFound/NotFound';
import { Profile } from './Profile/Profile';
import { RouteWrapper } from './lib/RouteWrapper';
import { SignUp } from './SignUp/SignUp';
import { Verification } from './Verification/Verification';

export const RouterPage = () => (
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
      <Route element={<RouteWrapper title="Профиль" />}>
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
