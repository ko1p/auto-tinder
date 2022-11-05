import { Route, Routes } from 'react-router';

import { Main } from 'pages/Main/Main';
import React from 'react';
import { SignIn } from 'pages/SignIn/SignIn';
import { routing } from 'shared/routing';
import { RouteWrapper } from './lib/RouteWrapper';
import { SignUp } from './SignUp/SignUp';
import { Layout } from './lib/Layout';

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
    </Route>
  </Routes>
);
